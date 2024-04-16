const connectToDB = require('../../../database/db');
const { hash, generateAccessToken } = require('../../middlware/authenticate');
const ObjUser = require('../Model/user.model');
const bcrypt = require('bcrypt');
class UserService {

    constructor() {
        this.db = connectToDB();
    }

    create = async(email, mpd) => {
        try {
            console.log("ici");
            const hashedPassword = await hash(mpd);
            console.log(hashedPassword)
            const newUser = new ObjUser({
                email : email,
                mdp : hashedPassword
            });
            return await newUser.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    sign = async(email, mdp) => {
        try {
            const ls_user = await ObjUser.findOne({email : email});
            if(!ls_user) {throw new Error("Email ou mot de passe incorrect");} 
            const user_mdp = await bcrypt.compare(mdp, ls_user.mdp);
            if (!user_mdp) throw new Error('Email ou mot de passe incorrect');
            const USER_MODEL = {
                id: ls_user.id,
                email: ls_user.email,
                niveau: ls_user.isAdmin
            };
            const access_token = generateAccessToken(USER_MODEL);
            return {ls_user, access_token};
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserService;
