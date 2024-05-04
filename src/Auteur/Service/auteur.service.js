const connectToDB = require('../../../database/db');
const ObjAuteur = require('../Model/auteur.model');


class ServiceAuteur {
    constructor() {
        this.db = connectToDB();
    }

    getAuteurs = () => {
        try {
            return ObjAuteur.find();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
   
    getAuteur = (id) => {
        try {
            if(!id) throw new Error("Id not found");
            return ObjAuteur.findById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    createAuteur = async (data) => {
        try {
            if (!data.nom) throw new Error("Nom auteur obligatoire.");
            const newAuteur = new ObjAuteur({
                nom: data.nom,
                photo: data.photo
            });

            return await newAuteur.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateAuteur = async(id, data) => {
        try {
            if(!id) throw new Error("Id not found");
            const updatedAuteur = await ObjAuteur.findByIdAndUpdate(id, data, { new: true });
            if (!updatedAuteur) throw new Error("Auteur not found");
            return updatedAuteur;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteAuteur = async (id) => {
        try {
            if (!id) throw new Error("Id not found");
            const deletedAuteur = await ObjAuteur.findByIdAndDelete(id);
            if (!deletedAuteur) throw new Error("Auteur not found");
            return deletedAuteur;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ServiceAuteur;