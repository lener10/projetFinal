const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const uploads = multer({ storage: storage });

// Middleware pour redimensionner l'image
const resizeFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const filename = `post_${Date.now()}.jpg`;
    await sharp(req.file.path)
      .resize(800) // largeur max 800px
      .jpeg({ quality: 60 })
      .toFile("uploads/" + filename);

  
    fs.unlinkSync(req.file.path);

   
    req.body.photo = filename;

    next(); // continuer vers le contrôleur
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors du traitement de l'image" });
  }
};

module.exports = { uploads, resizeFile };
