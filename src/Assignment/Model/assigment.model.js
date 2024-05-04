let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Auteur = require('../../Auteur/Model/auteur.model');
let Matiere = require('../../Matiere/Model/matiere.model')
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let AssignmentSchema = Schema({
    dateDeRendu: Date,
    titre: String,
    description:  String,
    matiere: { type: Schema.Types.ObjectId, ref: Matiere }, // Lien avec le modèle Matiere
    auteur: { type: Schema.Types.ObjectId, ref: Auteur }, // Lien avec le modèle Auteur
    note : Number,
    remarque : String,
    photo: String,
    rendu: Boolean
});

AssignmentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('assignments', AssignmentSchema);