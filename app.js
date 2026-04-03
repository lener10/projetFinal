require('dotenv').config();
const express = require('express');
const connectDb = require("./config/db");

const app = express();
app.use(express.json());

// Connexion MongoDB (sans options obsolètes)
connectDb();

// Routes
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const creditRoutes = require('./routes/creditRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(process.env.PORT, () => console.log(`Serveur demarre sur port ${process.env.PORT}`));
