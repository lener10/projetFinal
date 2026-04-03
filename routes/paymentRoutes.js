// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/authMiddleware');

// Routes protégées
router.post('/', auth, paymentController.addPayment);
router.get('/:creditId', auth, paymentController.getPaymentsByCredit);

module.exports = router;
