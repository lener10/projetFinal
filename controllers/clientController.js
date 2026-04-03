const Client = require('../models/Client');

// Ajouter un client
exports.addClient = async (req, res) => {
  try {
    const { nom, telephone, adresse } = req.body;
    const photo = req.file ? req.file.filename : null;

    const client = new Client({ nom, telephone, adresse, photo });
    await client.save();
    res.status(201).json({ message: "Client ajouté avec succès", client });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Liste des clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
