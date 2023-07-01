'use strict'

/**
* ライブラリの読み込み
*/
const vision = require('@google-cloud/vision')

/**
* Cloud Vision text detection
* 画像からテキストを抽出する
* @param {buffer} imageBuffer
*/
exports.cloudVisionText = async imageBuffer => {
  const client = new vision.ImageAnnotatorClient()
  const results = await client.documentTextDetection({
    image: { content: imageBuffer }
  })
  if (results[0].fullTextAnnotation === null) {
    const message = 'テキストが抽出できませんでした'
    return message
  } else {
    const message = results[0].fullTextAnnotation.text
    return message
  }
}