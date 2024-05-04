const ServiceAuteur = require('../Service/auteur.service');

class CtrlAssignment {
    constructor(){
        this.serviceAuteur = new ServiceAuteur();
    }

    create = async(req, res) => {
        try {
            req.body.photo = req.file ? req.file.filename : null;
            const newAuteur = await this.serviceAuteur.createAuteur(req.body); 
            return res.status(200).send({statue : "ok", message : "Auteur crée avec succès", data : newAuteur});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    gets = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Liste recupérer avec succes", data :  await this.serviceAuteur.getAuteurs()});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    get = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Liste recupérer avec succes", data :  await this.serviceAuteur.getAuteur(req.params.id)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    update = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Modification réussi", data : await this.serviceAuteur.updateAuteur(req.body.id, req.body)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    delete = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Supression réussi", data : await this.serviceAuteur.deleteAuteur(req.body.id)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

}

module.exports = CtrlAssignment;