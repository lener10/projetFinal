const User = require("../models/User");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//  INSCRIPTION
exports.register = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const user = new User({ nom, email, motDePasse });
    await user.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  LOGIN
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch)
      return res.status(400).json({ error: "Mot de passe incorrect" });

    res.json({
      message: "Connexion réussie",
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};