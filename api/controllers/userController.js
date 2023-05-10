const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);

const registerUser = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
};

const loginUser = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const isMatch = bcrypt.compareSync(password, userDoc.password);
      if (isMatch) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1d' },
          (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
          }
        );
      } else {
        res.status(422).json('Wrong password!');
      }
    } else {
      res.json('User is not found in the database!');
    }
  } catch (error) {
    res.status(422).json(error);
  }
};

const profileUser = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

const profileUserwithPassword = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { currentpassword, newpassword } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
      if (err) throw err;
      const { _id, password } = await User.findById(userData.id);
      const userDoc = await User.findOne({ _id });
      if (bcrypt.compareSync(currentpassword, userDoc.password)) {
        const newPasswordWithHash = bcrypt.hashSync(newpassword, bcryptSalt);
        userDoc.set({
          password: newPasswordWithHash,
        });
        await userDoc.save();
        res.json(true);
      } else {
        res.json(false);
      }
    });
  } else {
    res.json('User not found');
  }
};

module.exports = {
  registerUser,
  loginUser,
  profileUser,
  profileUserwithPassword,
};
