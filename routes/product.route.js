const express = require('express');
const router = express.Router();

// Require the controllers
const product_controller = require('../controllers/product.controller');

// url to check that all of our files are communicating correctly
router.post('/create', product_controller.create);

router.get('/get', product_controller.get);

router.put('/update', product_controller.update);

router.delete('/delete', product_controller.delete);

module.exports = router;
