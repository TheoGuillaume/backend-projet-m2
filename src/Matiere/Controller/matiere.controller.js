const ServiceMatiere = require('../Service/matiere.service');

class CtrlMatiere {
    constructor(){
        this.serviceMatiere = new ServiceMatiere();
    }

    create = async(req, res) => {
        try {
            // Récupérez les noms de fichier des champs photo et photo_prof
            req.body.photo = req.files.photo ? req.files.photo[0].filename : null;
            req.body.photo_prof = req.files.photo_prof ? req.files.photo_prof[0].filename : null;
            const newMatiere = await this.serviceMatiere.createMatiere(req.body); 
            return res.status(200).send({statue : "ok", message : "Matiere crée avec succès", data : newMatiere});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    gets = async(req, res) => {
        try {
            const search = req.query.search || ''; // Recherche par nom
            const page = parseInt(req.query.page) || 1; // Page actuelle
            const limit = parseInt(req.query.limit) || 10; // Limite par page
            return res.status(200).send({statue : "ok", message : "Liste recupérer avec succes", data :  await this.serviceMatiere.getMaieres(search, page, limit)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    } 

    get = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Liste recupérer avec succes", data :  await this.serviceMatiere.getMatiere(req.params.id)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    update = async(req, res) => {
        try {
            if (typeof req.body.matiere === 'string') {
                req.body.matiere = JSON.parse(req.body.matiere);
            }
            if (req.files.photo) {
                req.body.matiere.photo = req.files.photo ? req.files.photo[0].filename : null;
            }

            if(req.files.photo_prof){
                req.body.matiere.photo_prof = req.files.photo_prof ? req.files.photo_prof[0].filename : null;
            }
            return res.status(200).send({statue : "ok", message : "Modification réussi", data : await this.serviceMatiere.updateMatiere(req.body)});
        } catch (error) {
            console.log("erreur", error)
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    delete = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Supression réussi", data : await this.serviceMatiere.deleteMatiere(req.body.id)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

}

module.exports = CtrlMatiere;