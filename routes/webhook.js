'use strict'

const line = require('@line/bot-sdk')
const express = require('express')
const func = require('../lib/index')
const gcloudApi = require('../lib/gcloud-api')
const grammarlyApi = require('../lib/grammarly-api')
const notionApi = require('../lib/notion-api')
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

/**
* 本番用のルート
*/
router.post('/', line.middleware(config), async (req, res) => {
    Promise.all(req.body.events.map(handlerEvent))
      .then((result) => {
        console.log(result)
        res.status(200).end()
      })
      .catch((err) => {
        console.error(err)
        res.status(500).end()
      })
  })

  async function quickstart() {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.documentTextDetection('./public/apple.png');
    const fullTextAnnotation = result.fullTextAnnotation;

    return fullTextAnnotation.text;
  }

const handlerEvent = async (event) => {
    // Webhookの検証
    if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
        return 'Webhookの検証'
    }

    const replyToken = event.replyToken
    const message = event.message
    let text

    if (message.type == 'image') {
      text = await imageToText(message.id)
      let correctedText = await correctTextWithGrammarly(text)
      await replyText(replyToken, correctedText)

      return await notionApi.saveToNotion(correctedText);
    }
}

/**
* テキストを返信する関数
*
* @param {String} token
* @param {String[] | String} texts
*/
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts]
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  )
}

/**
* 画像をテキストに変換する関数
*
* @param {Number} messageId
*/
const imageToText = async (messageId) => {
  const buffer = await func.getContentBuffer(messageId)
  const text = await gcloudApi.cloudVisionText(buffer)
  const texts = await func.getTextArray(text)
  return texts
}

/**
* Grammarly APIを使用して送信したテキストを添削してもらう
*
* @param {object} text
*/
const correctTextWithGrammarly = async (text) => {
  return await grammarlyApi.correctText(String(text))
}

module.exports = router ;
