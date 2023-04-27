const express = require('express');
const router = express.Router();
const { registerUser, loginUser, profileUser } = require('../controllers/userController');

router.route('/backend/register').post(registerUser);
router.route('/backend/login').post(loginUser);
router.route('/backend/profile').get(profileUser);

module.exports = router;