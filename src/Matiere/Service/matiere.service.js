const connectToDB = require('../../../database/db');
const ObjMatiere = require('../Model/matiere.model');


class ServiceMatiere {
    constructor() {
        this.db = connectToDB();
    }

    getMaieres = async(search = '', page = 1, limit = 1) => {
        try {
            const query = {};
            if(search) {
                query.$or = [
                    { nom: { $regex: search, $options: 'i' } },
                    { professeur: { $regex: search, $options: 'i' } }
                ];
            }

            console.log("search", query);
            const aggregateQuery = ObjMatiere.aggregate([{ $match: query },{ $sort : { updateAdt: -1 } }]);
            const options = {
                page: page, 
                limit: limit
            };
            return await ObjMatiere.aggregatePaginate(aggregateQuery, options);
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
                photo: data.photo,
                photo_prof: data.photo_prof

            });

            return await newMatiere.save();
        } catch (error) {
            console.error(error); 
            throw error;
        }
    }

    updateMatiere = async(data) => {
        try {
            if(!data.id) throw new Error("Id not found");
            const updateMaitiere = await ObjMatiere.findByIdAndUpdate(data.id, data.matiere, { new: true });
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