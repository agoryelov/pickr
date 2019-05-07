let cheerio = require("cheerio");
let $ = cheerio.load('https://www.cbc.ca/news/canada/ottawa/ottawa-river-gatineau-flood-photos-1.5124474');
let jsonframe = require('jsonframe-cheerio');

console.log($('h1 .detailHeadline').children);