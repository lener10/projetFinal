// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { uploads, resizeFile } = require("../middlewares/upload");
const protect = require('../middlewares/authMiddleware');

router.post("/", protect, uploads.single("photo"), resizeFile, clientController.addClient);
router.get('/', protect, clientController.getClients);
router.delete('/:id', protect, clientController.deleteClient);

module.exports = router;





