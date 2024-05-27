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
    rendu: {type : Boolean, default: false},
    createAdt: {
        type: Date,
        default: Date.now
    },
    updateAdt: {
        type: Date,
        default: Date.now
    },
});

AssignmentSchema.plugin(mongoosePaginate);
// Middleware to update the updateAdt field on save
AssignmentSchema.pre('save', function(next) {
    this.updateAdt = Date.now();
    next();
});

AssignmentSchema.pre('findOneAndUpdate', function(next) {
    this._update.updateAdt = Date.now();
    next();
});


AssignmentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('assignments', AssignmentSchema);