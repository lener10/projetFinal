// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  credit: { type: mongoose.Schema.Types.ObjectId, ref: 'Credit', required: true },
  montant: { type: Number, required: true ,min: [1, "Le montant doit etre superieur a 0"]},
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
