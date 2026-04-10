const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true }
});

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function() {
  if (!this.isModified('motDePasse')) return ;
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
});

// Méthode pour comparer mot de passe
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);