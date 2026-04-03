const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: "Token requis" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};


