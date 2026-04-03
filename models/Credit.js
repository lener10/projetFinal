const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  produit: { type: String, required: true },
  quantite: { type: Number, required: true },
  montantTotal: { type: Number, required: true },
  resteAPayer: { type: Number, default: function() { return this.montantTotal; } },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Credit', creditSchema);
