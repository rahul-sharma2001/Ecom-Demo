const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user')


router.post('/',controllers.addUser);
router.post('/login',controllers.login);

module.exports = router