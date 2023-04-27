const express = require('express');
const router = express.Router();
const { registerUser, loginUser, profileUser } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(profileUser);

module.exports = router;