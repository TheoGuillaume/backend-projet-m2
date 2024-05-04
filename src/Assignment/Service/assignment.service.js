const connectToDB = require('../../../database/db');
const ObjAssignment = require('../Model/assigment.model');
let Matiere = require('../../Matiere/Model/matiere.model');
let Auteur = require('../../Auteur/Model/auteur.model');
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

    getAssignments = async (page, limit) => {
        try {

            let aggregateQuery = ObjAssignment.aggregate([
                {
                    $lookup: {
                        from: 'auteurs', // Le nom de la collection dans la base de données
                        localField: 'auteur',
                        foreignField: '_id',
                        as: 'auteurDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'matieres', // Le nom de la collection dans la base de données
                        localField: 'matiere',
                        foreignField: '_id',
                        as: 'matiereDetails'
                    }
                },
                {
                    $unwind: '$auteurDetails'
                },
                {
                    $unwind: '$matiereDetails'
                },
                {
                    $project: {
                        dateDeRendu: 1,
                        titre: 1,
                        description: 1,
                        note: 1,
                        remarque: 1,
                        photo: 1,
                        rendu: 1,
                        'auteurDetails.nom': 1,
                        'auteurDetails.photo': 1,
                        'matiereDetails.nom': 1,
                        'matiereDetails.professeur': 1,
                        'matiereDetails.image': 1
                    }
                }
            ]);
        

            // Utilisation de populate pour remplacer les références par les documents correspondants de Matiere et Auteur
            const data = await ObjAssignment.aggregatePaginate(aggregateQuery, {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10
            });

            //console.log(data);

            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    getAssignment = async (id) => {
        try {
            if (!id) throw new Error("Id not found");
            return await ObjAssignment.findById(id).populate('matiere').populate('auteur');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    createAssignment = async (data) => {
        try {
            if (!data.auteur) throw new Error("Nom auteur obligatoire.");
            if (!data.matiere) throw new Error("Matière obligatoire.");
            if (!data.dateDeRendu) throw new Error("Date de rendu obligatoire.");

            const newAssignment = new ObjAssignment({
                titre: data.titre,
                description: data.description,
                auteur: data.auteur,
                matiere: data.matiere,
                note: data.note || 0,
                dateDeRendu: data.dateDeRendu,
                remarque: data.remarque || "",
                photo: data.photo || null,
                rendu: false
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