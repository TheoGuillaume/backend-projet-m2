const express = require('express');
const router = express.Router();
const CrtlUser = require('../Controller/user.controler');
const controller = new CrtlUser();

router.post('/create', controller.createUser);
router.post('/login', controller.login);

module.exports = router;