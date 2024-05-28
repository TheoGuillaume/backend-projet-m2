const ServiceAssignment = require('../Service/assignment.service');

class CtrlAssignment {
    constructor(){
        this.serviceAssgnment = new ServiceAssignment();
    }

    create = async(req, res) => {
        try {
            req.body.photo = req.file ? req.file.filename : null;
            const newAssignment = await this.serviceAssgnment.createAssignment(req.body); 
            return res.status(200).send({statue : "ok", message : "Assignment crée avec succès", data : newAssignment});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    gets = async(req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const rendu = req.query.rendu || false;
            return res.status(200).send({statue : "ok", message : "Liste recupérer avec succes", data :  await this.serviceAssgnment.getAssignments(page, limit, rendu)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    get = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Liste recupérer avec succes", data :  await this.serviceAssgnment.getAssignment(req.params.id)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    update = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Modification réussi", data : await this.serviceAssgnment.updateAssignment(req.body.assignment)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    delete = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Supression réussi", data : await this.serviceAssgnment.deleteAssignment(req.body.id)});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    generateData = async(req, res) => {
        try {
            return res.status(200).send({statue : "ok", message : "Génération donnés réussi", data : await this.serviceAssgnment.generateAssignments()});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }
}

module.exports = CtrlAssignment;