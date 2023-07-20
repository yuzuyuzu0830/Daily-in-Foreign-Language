'use strict'

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_TOKEN })

exports.saveToNotion = async (correctedText) => {
    return await notion.pages.create({
      parent: { database_id: process.env.DATABASE_ID },
      properties: {
        title: {
          title: [{
            text: {content: new Date().toISOString().split('T')[0]},
          }],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{
              type: "text",
              text: {content: correctedText},
            }],
          },
        },
      ],
    });
  }
