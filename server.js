require('dotenv').config();

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  };

const app = express();
const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'image') {
    return handleImageMessage(event);
  } else {
    return Promise.resolve(null);
  }
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);