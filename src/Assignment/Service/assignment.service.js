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
            const etudiant = ['663536572b18a2016eb83a56','663536762b18a2016eb83a58','663536902b18a2016eb83a5a','664a4e0f85f0421e148738f5','664a74ba5fb3316a309b15e9']
            const matieres = ['664fac713a3e68ebb1fdc9b7', '664fad183a3e68ebb1fdc9b9', '6651b81419f7bf3b052c8b46', '6651dc9bfc8fa794e393b723'];
            for (let i = 0; i < 990; i++) {
                console.log("iteration", i);
                let assignment = new ObjAssignment({
                    titre : 'Tp'+' '+ i,
                    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolorem fuga beatae vero officiis vel, blanditiis magnam explicabo facilis repellat error hic alias, illum unde. Blanditiis sapiente possimus labore magnam?',
                    matiere: matieres[Math.floor(Math.random() * matieres.length)],
                    auteur:  etudiant[Math.floor(Math.random() * etudiant.length)],
                    dateDeRendu: faker.date.future(),
                    remarque: null,
                    etat: 1,
                    rendu: false
                });
    
                await assignment.save();
            }

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getAssignments = async (page, limit,rendu) => {
        try {
            let matchQuery = { };
            console.log(typeof rendu)
            if (rendu !== undefined) {
                if (rendu === 'true' || rendu === true) {
                    matchQuery.rendu = true;
                } else if (rendu === 'false' || rendu === false) {
                    matchQuery.rendu = false;
                } else {
                    throw new Error('Invalid value for "rendu". Must be either "true" or "false".');
                }
            }
            let aggregateQuery = ObjAssignment.aggregate([
                {
                    $lookup: {
                        from: 'auteurs',
                        localField: 'auteur',
                        foreignField: '_id',
                        as: 'auteurDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'matieres',
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
                    $match: matchQuery // Filtrer les documents par la valeur de "rendu"
                },
                {
                    $sort: { updateAdt: -1 } // Trier par updateAdt en ordre décroissant
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
                        'matiereDetails.photo': 1,
                        'matiereDetails.photo_prof': 1,
                        updateAdt: 1
                    }
                }
            ]);
    
            const data = await ObjAssignment.aggregatePaginate(aggregateQuery, {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10
            });

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
                dateDeRendu: data.dateDeRendu,
                remarque: data.remarque || "",
                photo: data.photo || null,
                rendu:  false
            });

            return await newAssignment.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateAssignment = async(assignment = {}) => {
        try {
            const updatedAssignment = await ObjAssignment.findByIdAndUpdate(assignment._id, assignment, { new: true });
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