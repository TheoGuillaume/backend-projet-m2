let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let MatiereSchema = Schema({
    nom: String,
    professeur: String,
    photo : String,
    photo_prof : String,
    createAdt: {
        type: Date,
        default: Date.now
    },
    updateAdt: {
        type: Date,
        default: Date.now
    },
});

MatiereSchema.plugin(mongoosePaginate);
// Middleware to update the updateAdt field on save
MatiereSchema.pre('save', function(next) {
    this.updateAdt = Date.now();
    next();
});

// Middleware to update the updateAdt field on findOneAndUpdate
MatiereSchema.pre('findOneAndUpdate', function(next) {
    this._update.updateAdt = Date.now();
    next();
});


module.exports = mongoose.model('matieres', MatiereSchema);