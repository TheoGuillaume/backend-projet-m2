require('dotenv').config();
const mongoose = require('mongoose');

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://guillaumehaisoa:tdp5P4j6L8Ip1bl4@cluster0.zbu2bzz.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0', mongoOptions);
        console.log('Connexion à MongoDB réussie !');
        return mongoose.connection.db;
    } catch (error) { // Update the variable name from 'err' to 'error'
        console.error('Erreur lors de la connexion à MongoDB:', error); // Update 'err' to 'error'
        throw error; // Update 'err' to 'error'
    }
}

module.exports = connectToDB;
