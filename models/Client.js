const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  adresse: { type: String, required: true },
  photo: { type: String } // chemin du fichier uploadé
});

module.exports = mongoose.model('Client', clientSchema);
