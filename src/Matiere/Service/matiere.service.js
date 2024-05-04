const connectToDB = require('../../../database/db');
const ObjMatiere = require('../Model/matiere.model');


class ServiceMatiere {
    constructor() {
        this.db = connectToDB();
    }

    getMaieres = () => {
        try {
            return ObjMatiere.find();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
   
    getMatiere = (id) => {
        try {
            if(!id) throw new Error("Id not found");
            return ObjMatiere.findById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    createMatiere = async (data) => {
        try {
            if (!data.nom) throw new Error("Nom matiere obligatoire.");
            const newMatiere = new ObjMatiere({
                nom: data.nom,
                professeur: data.professeur,
                photo: data.photo
            });

            return await newMatiere.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateMatiere = async(id, data) => {
        try {
            if(!id) throw new Error("Id not found");
            const updateMaitiere = await ObjMatiere.findByIdAndUpdate(id, data, { new: true });
            if (!updateMaitiere) throw new Error("Matiere not found");
            return updateMaitiere;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteMatiere = async (id) => {
        try {
            if (!id) throw new Error("Id not found");
            const deleteMaitere = await ObjMatiere.findByIdAndDelete(id);
            if (!deleteMaitere) throw new Error("Matiere not found");
            return deleteMaitere;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ServiceMatiere;