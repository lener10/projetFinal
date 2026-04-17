# projetFinal

#  ProjetFinalExpress – API Gestion Crédit Client

API REST développée avec **Node.js, Express et MongoDB** permettant de gérer des clients, des crédits et les paiements associés.

---

##  Fonctionnalités principales

- Authentification utilisateur (JWT)
- Gestion des clients
- Gestion des crédits accordés aux clients
- Gestion des paiements des crédits
- Upload d’images (photo client)
- Protection des routes avec middleware d’authentification

---

##  Technologies utilisées

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- Multer (upload fichiers)  
- Bcrypt (hash mot de passe)

---

## 📁 Structure du projet

ProjetFinalExpress  
│  
├── controllers/  
│   ├── userController.js  
│   ├── clientController.js  
│   ├── creditController.js  
│   └── paymentController.js  
│  
├── models/  
│   ├── User.js  
│   ├── Client.js  
│   ├── Credit.js  
│   └── Payment.js  
│  
├── routes/  
│   ├── userRoutes.js  
│   ├── clientRoutes.js  
│   ├── creditRoutes.js  
│   └── paymentRoutes.js  
│  
├── middlewares/  
│   ├── authMiddleware.js  
│   └── upload.js  
│  
├── uploads/  
├── app.js  
└── package.json  


## ⚙️ Installation du projet


git clone https://github.com/lener10/projetFinal.git
cd projetFinal
