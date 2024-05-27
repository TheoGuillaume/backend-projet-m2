const mongoose = require('mongoose');
const Auteur = require('./src/Auteur/Model/auteur.model');
const Matiere = require('./src/Matiere/Model/matiere.model');
const Assignment = require('./src/Assignment/Model/assigment.model');

mongoose.connect('mongodb+srv://guillaumehaisoa:tdp5P4j6L8Ip1bl4@cluster0.zbu2bzz.mongodb.net/assignments?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const testAggregation = async () => {
    try {
        // Vérifier les données dans les collections
        const auteurs = await Auteur.find();
        const matieres = await Matiere.find();
        const assignments = await Assignment.find();

        console.log("Auteurs: ", auteurs);
        console.log("Matieres: ", matieres);
        console.log("Assignments: ", assignments);

        // Exécuter l'agrégation
        const aggregateQuery = Assignment.aggregate([
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
                    'matiereDetails.photo': 1
                }
            }
        ]);

        const results = await aggregateQuery.exec();
        console.log("Aggregation Results: ", results);
    } catch (error) {
        console.error("Aggregation Error: ", error);
    } finally {
        mongoose.connection.close();
    }
};

testAggregation();
