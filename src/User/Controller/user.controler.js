const ServiceUser = require('../Service/user.service');

class CtrlUser {

    constructor(){
        this.serviceUser = new ServiceUser();
    }

    createUser = async(req, res) => {
        try {
            console.log('req.body.mdp', req.body.mdp)
            const newUser = await this.serviceUser.create(req.body.email, req.body.mdp);
            return res.status(200).send({statue : "ok", message : "User crée avec succès", data : newUser});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

    login = async(req, res) => {
        try {
            const user = await this.serviceUser.sign(req.body.email, req.body.mdp);
            return res.status(200).send({statue : "ok", message : "User crée avec succès", data : user});
        } catch (error) {
            return res.status(500).send({statue : "ko", message : error.message})
        }
    }

}

module.exports = CtrlUser;