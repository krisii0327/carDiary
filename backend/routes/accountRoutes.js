const express = require('express');
const router = express.Router();
const { accountLogout, car_photoUpload, addNewCar, saveCar, listOwnCars, listAllCars, getCarDataToForm, deleteCar } = require('../controllers/accountController');

const multer = require('multer');
const photosMiddleware = multer({dest: '/tmp'});


router.route('/logout').post(accountLogout);
router.route('/upload').post(photosMiddleware.any('photos', 100), car_photoUpload);
router.route('/garage').post(addNewCar).get(listOwnCars).put(saveCar);
router.route('/garage/:id').get(getCarDataToForm);
router.route('/cars').get(listAllCars);
router.route('/delete/:car_id').delete(deleteCar);

module.exports = router;