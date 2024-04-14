let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let AssignmentSchema = Schema({
    nom_auteur: String,
    prenom_auteur: String,
    photo_auteur: String,
    matiere: String,
    note: Number,
    dateDeRendu: Date,
    remarque: String,
    etat: Number
});

AssignmentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('assignments', AssignmentSchema);