let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let UserShema = Schema({
    email :{ type: String, required: true, unique: true },
    mdp: { type: String, required: true },
    isAdmin : { type :Boolean, default: true},
});

UserShema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserShema);



