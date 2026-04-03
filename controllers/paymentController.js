// controllers/paymentController.js
const Payment = require('../models/Payment');
const Credit = require('../models/Credit');

// Ajouter un paiement
exports.addPayment = async (req, res) => {
  try {
    const { creditId, montant } = req.body;

    // Vérifier que le crédit existe
    const credit = await Credit.findById(creditId);
    if (!credit) return res.status(404).json({ error: "Crédit non trouvé" });

    // Créer le paiement
    const payment = new Payment({ credit: creditId, montant });
    await payment.save();

    // Mettre à jour le reste à payer
    credit.resteAPayer -= montant;
    if (credit.resteAPayer < 0) credit.resteAPayer = 0; // éviter négatif
    await credit.save();

    res.status(201).json({ message: "Paiement ajouté avec succès", payment, resteAPayer: credit.resteAPayer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Historique des paiements pour un crédit
exports.getPaymentsByCredit = async (req, res) => {
  try {
    const payments = await Payment.find({ credit: req.params.creditId }).sort({ date: -1 });
    res.json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
