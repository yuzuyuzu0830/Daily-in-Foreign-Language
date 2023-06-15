'use strict'

require('dotenv').config();

const express = require('express');

const app = express();
const routes = {
    webhookRouter: require('./routes/webhook.js')
  }
app.use('/webhook', routes.webhookRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server running at ${PORT}`);