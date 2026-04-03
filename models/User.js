const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true }
});

// Avant sauvegarde : hash du mot de passe
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// Méthode pour comparer mot de passe
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
