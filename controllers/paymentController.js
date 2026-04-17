const Payment = require('../models/Payment');
const Credit = require('../models/Credit');

// Ajouter un paiement
exports.addPayment = async (req, res) => {
  try {
    const { creditId, montant } = req.body;

    // Vérifier champs obligatoires
    if (!creditId || !montant) {
      return res.status(400).json({ error: "creditId et montant sont obligatoires" });
    }

    //  Interdire montant négatif ou 0
    if (montant <= 0) {
      return res.status(400).json({ error: "Le montant doit être supérieur à 0" });
    }

    // Vérifier que le crédit existe
    const credit = await Credit.findById(creditId);
    if (!credit) {
      return res.status(404).json({ error: "Crédit non trouvé" });
    }

    //  Crédit déjà payé
    if (credit.resteAPayer === 0) {
      return res.status(400).json({ error: "Ce crédit est déjà entièrement payé" });
    }

    //  Empecher payer plus que le reste
    if (montant > credit.resteAPayer) {
      return res.status(400).json({
        error: `Le montant dépasse le reste à payer (${credit.resteAPayer})`
      });
    }

    // Création du paiement
    const payment = new Payment({
      credit: creditId,
      montant
    });

    await payment.save();

    // Mise a jour du reste a payer
    credit.resteAPayer -= montant;
    await credit.save();

    res.status(201).json({
      message: "Paiement ajouté avec succès",
      payment,
      resteAPayer: credit.resteAPayer
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Historique des paiements pour un credit
exports.getPaymentsByCredit = async (req, res) => {
  try {
    const payments = await Payment.find({ credit: req.params.creditId })
      .sort({ date: -1 });

    res.json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};