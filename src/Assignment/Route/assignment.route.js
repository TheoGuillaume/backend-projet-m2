const express = require('express');
const router = express.Router();
const CtrlAssignment = require('../Controller/assignment.controller');
const controller = new CtrlAssignment();

//router.post('/create',upload(['.png', '.jpg'],'image','photo'), controller.create);
router.post('/assignments/', controller.create);
router.get('/assignments', controller.gets);
router.get('/assignments/:id', controller.get);
router.put('/assignments/', controller.update);
router.delete('/assignments', controller.delete);
router.post('/assignments/generate', controller.generateData);

module.exports = router;