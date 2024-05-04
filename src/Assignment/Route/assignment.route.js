const express = require('express');
const router = express.Router();
const CtrlAssignment = require('../Controller/assignment.controller');
const controller = new CtrlAssignment();
const {authenticateToken} = require('../../middlware/authenticate');
const upload = require('../../middlware/upload')

//router.post('/create',upload(['.png', '.jpg'],'image','photo'), controller.create);
router.post('/assignments/',upload(['.png', '.jpg', '.jpeg'],'image','photo'), controller.create);
router.get('/assignments', authenticateToken,controller.gets);
router.get('/assignments/:id',controller.get);
router.put('/assignments/',upload(['.png', '.jpg', '.jpeg'],'image','photo'), controller.update);
router.delete('/assignments', controller.delete);
router.post('/assignments/generate', controller.generateData);

module.exports = router;