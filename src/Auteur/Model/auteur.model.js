let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');
let AuteurSchema = Schema({
    nom: String,
    prenom: String,
    dateNaissance: Date,
    createAdt: {
        type: Date,
        default: Date.now
    },
    updateAdt: {
        type: Date,
        default: Date.now
    },
    photo: String
});


AuteurSchema.plugin(mongoosePaginate);
// Middleware to update the updateAdt field on save
AuteurSchema.pre('save', function(next) {
    this.updateAdt = Date.now();
    next();
});

// Middleware to update the updateAdt field on findOneAndUpdate
AuteurSchema.pre('findOneAndUpdate', function(next) {
    this._update.updateAdt = Date.now();
    next();
});


module.exports = mongoose.model('auteurs', AuteurSchema);