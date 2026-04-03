// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Inscription
exports.register = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;
    const user = new User({ nom, email, motDePasse });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) return res.status(401).json({ error: "Mot de passe incorrect" });

    // Génération du token JWT
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });
    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
