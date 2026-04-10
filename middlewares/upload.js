const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// 🔹 Créer le dossier uploads s'il n'existe pas
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// 🔹 Configuration du stockage Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// 🔹 Filtrer uniquement les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images JPG, JPEG, PNG sont autorisées"));
  }
};

// 🔹 Middleware upload
const uploads = multer({
  storage: storage,
  fileFilter: fileFilter
});

// 🔹 Middleware pour redimensionner l'image
const resizeFile = async (req, res, next) => {
  try {
    // Si aucun fichier envoyé → continuer
    if (!req.file) {
      return next();
    }

    const filename = `post_${Date.now()}.jpg`;

    await sharp(req.file.path)
      .resize(800)
      .jpeg({ quality: 60 })
      .toFile("uploads/" + filename);

    // Supprimer l'image originale
    fs.unlinkSync(req.file.path);

    // Envoyer le nom du fichier au controller
    req.body.photo = filename;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors du traitement de l'image" });
  }
};

module.exports = { uploads, resizeFile };