# journal in Foreign Language

## Introduction
This is a application that utilizes the various APIs to analyze, correct and store handwritten journal entries. 
You can send an image of your handwritten journal via LINE, the image will then be processed by Google Cloud Vision API (gcloud-api) to transcribe the handwriting into text. 
This text is then sent to Grammarly API which corrects grammar and sends it back to LINE. Simultaneously, the corrected text is saved to Notion via the Notion API.

## How To Use
Write your journal entry and take a picture of it.
Send this image via LINE.
The application processes the image and sends the corrected text back to LINE.
The corrected text is simultaneously saved in Notion.
(LINE is a popular communication app in Japan)

## Prerequisites
LINE account
Notion account
Google Cloud account

## Installation and Setup
- Clone the repository:
```
$ git clone https://github.com/yuzuyuzu0830/Daily-in-Foreign-Language.git
```

- Navigate into the project directory:
```
$ cd Daily-in-Foreign-Language
```

- Install the required dependencies:
```
$ npm install
```

- Create a .env file in your root directory and set up your environment variables as follows:
```
LINE_API_KEY=your_line_api_key
GCLOUD_API_KEY=your_gcloud_api_key
NOTION_API_KEY=your_notion_api_key
```
Ensure you replace your_line_api_key, your_gcloud_api_key, your_grammarly_api_key, your_notion_api_key with your actual API keys.

- Once the environment variables are set up, you can run the application using the command:
```
$ node server.js
```

NOTE: Ensure you have Node.js and npm installed in your system. If not, you can download it from [here](https://nodejs.org/en/download).

You're all set! Your application should now be running. If you have any issues, please refer to the Support section.

## API Documentation
[LINE API](https://developers.line.biz/en/reference/messaging-api/)
[Google Cloud Vision API](https://cloud.google.com/vision/docs?hl=ja)
[Unofficial Grammarly API Client](https://github.com/stewartmcgown/grammarly-api)
[Notion API](https://developers.notion.com/docs)
