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

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/creditDB
JWT_SECRET=supersecretkey

npm start

Authentification
Inscription

POST /api/users/register
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "123456"
}

Connexion

POST /api/users/login

Réponse : Token JWT

Ajouter le token dans les headers :

Authorization: Bearer TOKEN

👤 Routes Clients

| Méthode | Route            | Description      |
| ------- | ---------------- | ---------------- |
| POST    | /api/clients     | Ajouter client   |
| GET     | /api/clients     | Liste clients    |
| PUT     | /api/clients/:id | Modifier client  |
| DELETE  | /api/clients/:id | Supprimer client |

💳 Routes Crédits
| Méthode | Route            | Description    |
| ------- | ---------------- | -------------- |
| POST    | /api/credits     | Ajouter crédit |
| GET     | /api/credits     | Liste crédits  |
| GET     | /api/credits/:id | Détail crédit  |

💰 Routes Paiements
| Méthode | Route                   | Description          |
| ------- | ----------------------- | -------------------- |
| POST    | /api/payments           | Ajouter paiement     |
| GET     | /api/payments/:creditId | Historique paiements |

