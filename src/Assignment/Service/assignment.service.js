const connectToDB = require('../../../database/db');
const ObjAssignment = require('../Model/assigment.model');
//const faker = require('faker');
const { faker } = require('@faker-js/faker');

class ServiceAssignment {
    constructor() {
        this.db = connectToDB();
    }

    generateAssignments = async() => {
        try {
            const matieres = ['Web', 'Base de donné', 'TP6', 'Réseau'];
            for (let i = 0; i < 1000; i++) {
                let assignment = new ObjAssignment({
                    nom_auteur: faker.internet.userName(),
                    prenom_auteur: faker.internet.userName(),
                    matiere: matieres[Math.floor(Math.random() * matieres.length)],
                    note: 0,
                    dateDeRendu: faker.date.future(),
                    remarque: null,
                    etat: 1
                });
    
                await assignment.save();
            }

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getAssignments = (page, limit) => {
        try {
            let agregateQuery = ObjAssignment.aggregate();
            const data = ObjAssignment.aggregatePaginate(agregateQuery, {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10
            });
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getAssignment = (id) => {
        try {
            if(!id) throw new Error("Id not found");
            return ObjAssignment.findById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    createAssignment = async (data) => {
        try {
            if (!data.nom_auteur) throw new Error("Nom auteur obligatoire.");
            if (!data.matiere) throw new Error("Matière obligatoire.");
            if (!data.dateDeRendu) throw new Error("Date de rendu obligatoire.");

            const newAssignment = new ObjAssignment({
                nom_auteur: data.nom_auteur,
                prenom_auteur: data.prenom_auteur,
                photo_auteur: data.photo || null,
                matiere: data.matiere,
                note: data.note || 0,
                dateDeRendu: data.dateDeRendu,
                remarque: data.remarque || "",
                etat: data.etat || 1
            });

            return await newAssignment.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateAssignment = async(id, data) => {
        try {
            if(!id) throw new Error("Id not found");
            const updatedAssignment = await ObjAssignment.findByIdAndUpdate(id, data, { new: true });
            if (!updatedAssignment) throw new Error("Assignment not found");
            return updatedAssignment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteAssignment = async (id) => {
        try {
            if (!id) throw new Error("Id not found");
            const deletedAssignment = await ObjAssignment.findByIdAndDelete(id);
            if (!deletedAssignment) throw new Error("Assignment not found");
            return deletedAssignment;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ServiceAssignment;