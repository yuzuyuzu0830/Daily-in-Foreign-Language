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
router.get('/', (req, res) => {
    res.send('Hello World')
    res.status(200).end()
})

module.exports = router ;
