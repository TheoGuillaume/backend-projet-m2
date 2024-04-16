const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    console.log("head", req.headers);
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).json({ message : "Veuillez regénérer un autre token"});
    };

    jwt.verify(token, process.env.SECRET_TOKEN, (err, utilisateur) => {
        console.log(err);
        if(err){
            return res.status(403).json({ message : "Impossible de se connecter"});
        }
        req.utilisateur = utilisateur;
        console.log("user online : ", req.utilisateur)
        next();
    })
};

exports.generateAccessToken = (utilisateur) => {
    return jwt.sign(utilisateur, process.env.SECRET_TOKEN, {expiresIn: '1d'});
}

exports.hash = async(mdp) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(mdp, salt);
    return hashedPassword;
}