const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  profileUser,
} = require('../controllers/userController');

router.route('/api/register').post(registerUser);
router.route('/api/login').post(loginUser);
router.route('/api/profile').get(profileUser);

module.exports = router;
