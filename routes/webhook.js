'use strict'

const line = require('@line/bot-sdk')
const express = require('express')

const router = express.Router()
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config)

/**
* 動作確認用のルート
*/
router.get('/', async (req, res) => {
  try {
      const labels = await quickstart();
      res.status(200).json({ message: "Hello World", labels });
  } catch (error) {
      res.status(500).json({ error: 'Something went wrong.' });
  }
})

  async function quickstart() {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.documentTextDetection('./public/apple.png');
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log('Text:');
    console.log(fullTextAnnotation.text);

    return fullTextAnnotation.text;
  }
module.exports = router ;
