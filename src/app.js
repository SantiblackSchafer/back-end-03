const express = require('express');
const mongoose = require('mongoose');
const mocksRouter = require('./routes/mocks.router');

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect('mongodb://localhost:27017/mocksDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Rutas
app.use('/api/mocks', mocksRouter);

module.exports = app;
