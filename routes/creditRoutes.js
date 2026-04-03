// routes/creditRoutes.js
const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');
const auth = require('../middlewares/authMiddleware');

// Routes protégées
router.post('/', auth, creditController.addCredit);
router.get('/', auth, creditController.getCredits);
router.get('/:id', auth, creditController.getCreditById);

module.exports = router;
