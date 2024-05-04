const ServiceMatiere = require('../Service/matiere.service');

class CtrlMatiere {
    constructor(){
        this.serviceMatiere = new ServiceMatiere();
    }

    create = async(req, res) => {
        try {
            req.body.photo = req.file ? req.file.filename : null;
            const newMatiere = await this.serviceMatiere.createMatiere(req.body); 
            return res.status(200).send({statue : "ok", message : "Matiere crée avec succès", data : newMatiere});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    gets = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Liste recupérer avec succes", data :  await this.serviceMatiere.getMaieres()});
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
            return res.status(200).send({statue : "ok", message : "Modification réussi", data : await this.serviceMatiere.updateMatiere(req.body.id, req.body)});
        } catch (error) {
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