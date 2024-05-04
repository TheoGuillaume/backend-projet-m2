const express = require('express');
const router = express.Router();
const CtrlMatiere = require('../Controller/matiere.controller');
const controller = new CtrlMatiere();
const {authenticateToken} = require('../../middlware/authenticate');
const upload = require('../../middlware/upload')

router.post('/matiere/',authenticateToken,upload(['.png', '.jpg', '.jpeg'],'image','photo'), controller.create);
router.get('/matiere', authenticateToken,controller.gets);
router.get('/matiere/:id',authenticateToken,controller.get);
router.put('/matiere/',authenticateToken,upload(['.png', '.jpg', '.jpeg'],'image','photo'), controller.update);
router.delete('/matiere',authenticateToken, controller.delete);

module.exports = router;