const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static(path.join(__dirname)));

/* ROUTES */
app.get('/', (req, res) => res.send('Server running'));
app.get('/home', (req, res) => res.send('Home page'));

app.get('/data', (req, res) => {
  res.json([{ id: 1, title: "Test Product" }]);
});

/* SIGN PDF ROUTER */
try {
  const signPdfRoute = require('./routes/signPdf');
  app.use('/sign-pdf', signPdfRoute);
} catch (err) {
  console.error("signPdf route error:", err.message);
}

/* DB (Vercel-safe ✅) */
if (!process.env.DB) {
  console.error("DB env variable missing");
} else {
  mongoose.connect(process.env.DB)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Error:", err.message));
}

/* ✅ LOCAL SERVER ONLY */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => console.log(`Server on ${PORT}`));
}

/* ✅ VERY IMPORTANT FOR VERCEL */
module.exports = app;
