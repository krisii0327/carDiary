const Car = require('../models/Car');
const User = require('../models/User');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const bucket = 'krisii0327-cardiary-app';

const accountLogout = async (req, res) => {
  res.cookie('token', '').json(true);
};

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
async function uploadToS3(path, originalFilename, mimetype) {
  mongoose.connect(process.env.MONGO_URL);
  const client = new S3Client({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: 'public-read',
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

const car_photoUpload = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
};

const addNewCar = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    nameOfTheCar,
    licensePlate,
    modelOfTheCar,
    yearOfTheCar,
    color,
    description,
    addedPhotos,
  } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
      if (err) throw err;
      const { _id } = await User.findById(userData.id);
      const carDoc = await Car.create({
        owner: userData.id,
        nameOfTheCar,
        licensePlate,
        modelOfTheCar,
        yearOfTheCar,
        color,
        description,
        photos: addedPhotos,
      });
      res.json(carDoc);
    });
  } catch (error) {
    console.log(error);
  }
};

const saveCar = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    id,
    nameOfTheCar,
    licensePlate,
    modelOfTheCar,
    yearOfTheCar,
    color,
    description,
    addedPhotos,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const carDoc = await Car.findById(id);
    if (userData.id === carDoc.owner.toString()) {
      carDoc.set({
        nameOfTheCar,
        licensePlate,
        modelOfTheCar,
        yearOfTheCar,
        color,
        description,
        photos: addedPhotos,
      });
      await carDoc.save();
      res.json('ok');
    }
  });
};

const listOwnCars = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Car.find({ owner: id }));
  });
};

const listAllCars = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Car.find());
};

const getCarDataToForm = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Car.findById(id));
};

const deleteCar = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { car_id } = req.params;
  res.json(await Car.findByIdAndDelete(car_id));
};

module.exports = {
  accountLogout,
  car_photoUpload,
  addNewCar,
  saveCar,
  listOwnCars,
  listAllCars,
  getCarDataToForm,
  deleteCar,
};
