// controllers/creditController.js
const Credit = require('../models/Credit');

// Enregistrer une vente à crédit
exports.addCredit = async (req, res) => {
  try {
    const { client, produit, quantite, montantTotal } = req.body;
    const credit = new Credit({ client, produit, quantite, montantTotal });
    await credit.save();
    res.status(201).json({ message: "Crédit enregistré avec succès", credit });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Liste des crédits
exports.getCredits = async (req, res) => {
  try {
    const credits = await Credit.find().populate('client');
    res.json(credits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Détail d’un crédit
exports.getCreditById = async (req, res) => {
  try {
    const credit = await Credit.findById(req.params.id).populate('client');
    if (!credit) return res.status(404).json({ error: "Crédit non trouvé" });
    res.json(credit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
 