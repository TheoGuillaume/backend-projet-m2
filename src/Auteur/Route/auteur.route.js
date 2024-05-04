const express = require('express');
const router = express.Router();
const CtrlAuteur = require('../Controller/auteur.controller');
const controller = new CtrlAuteur();
const {authenticateToken} = require('../../middlware/authenticate');
const upload = require('../../middlware/upload')

router.post('/auteur/',authenticateToken,upload(['.png', '.jpg', '.jpeg'],'image','photo'), controller.create);
router.get('/auteur', authenticateToken,controller.gets);
router.get('/auteur/:id',authenticateToken,controller.get);
router.put('/auteur/',authenticateToken,upload(['.png', '.jpg', '.jpeg'],'image','photo'), controller.update);
router.delete('/auteur',authenticateToken, controller.delete);

module.exports = router;