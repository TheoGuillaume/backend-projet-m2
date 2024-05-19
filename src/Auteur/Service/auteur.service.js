const connectToDB = require('../../../database/db');
const ObjAuteur = require('../Model/auteur.model');


class ServiceAuteur {
    constructor() {
        //this.db = connectToDB();
    }

    getAuteurs = async(search = '', page = 1, limit = 1) => {
        try {
            const query = {};
            if (search) {
                query.$or = [
                    { nom: { $regex: search, $options: 'i' } }, // Case-insensitive search for nom
                    { prenom: { $regex: search, $options: 'i' } } // Case-insensitive search for prenom
                ];
            }
            const aggregateQuery = ObjAuteur.aggregate([{ $match: query },{ $sort : { updateAdt: -1 } }]);
            const options = {
                page: page,
                limit: limit
            };
            return await ObjAuteur.aggregatePaginate(aggregateQuery, options);
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
                prenom: data.prenom,
                dateNaissance: data.dateNaissance,
                photo: data.photo
            });

            return await newAuteur.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateAuteur = async(data) => {
        try {
            if(!data.id) throw new Error("Id not found");
            const updatedAuteur = await ObjAuteur.findByIdAndUpdate(data.id, data.etudiant, { new: true });
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