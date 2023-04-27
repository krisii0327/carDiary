const express = require('express');
const router = express.Router();
const { accountLogout, car_photoUpload, addNewCar, saveCar, listOwnCars, listAllCars, getCarDataToForm, deleteCar } = require('../controllers/accountController');

const multer = require('multer');
const photosMiddleware = multer({dest: '/tmp'});

router.route('/api/logout').post(accountLogout);
router.route('/api/upload').post(photosMiddleware.any('photos', 100), car_photoUpload);
router.route('/api/garage').post(addNewCar).get(listOwnCars).put(saveCar);
router.route('/api/garage/:id').get(getCarDataToForm);
router.route('/api/cars').get(listAllCars);
router.route('/api/delete/:car_id').delete(deleteCar);

module.exports = router;