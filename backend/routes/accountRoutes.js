const express = require('express');
const router = express.Router();
const { accountLogout, car_photoUpload, addNewCar, saveCar, listOwnCars, listAllCars, getCarDataToForm, deleteCar } = require('../controllers/accountController');

const multer = require('multer');
const photosMiddleware = multer({dest: '/tmp'});

router.route('/backend/logout').post(accountLogout);
router.route('/backend/upload').post(photosMiddleware.any('photos', 100), car_photoUpload);
router.route('/backend/garage').post(addNewCar).get(listOwnCars).put(saveCar);
router.route('/backend/garage/:id').get(getCarDataToForm);
router.route('/backend/cars').get(listAllCars);
router.route('/backend/delete/:car_id').delete(deleteCar);

module.exports = router;