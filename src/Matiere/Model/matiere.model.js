let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    nom: String,
    professeur: String,
    image : String
});


module.exports = mongoose.model('matieres', MatiereSchema);