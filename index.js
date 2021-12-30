const cheerio = require("cheerio");
const axios = require("axios");
const repoPage = require("./repoPage");

axios
  .get("https://github.com/topics")
  .then((res) => {
    // console.log(res.data);
    let html = res.data;
    getTopicHTML(html);
  })
  .catch((err) => {
    console.log(err);
  });

function getTopicHTML(html) {
  let $ = cheerio.load(html);
  let linkEleArr = $(".no-underline.d-flex.flex-column.flex-justify-center");

  for (let i = 0; i < linkEleArr.length; i++) {
    let href = $(linkEleArr[i]).attr("href");
    //console.log(href);
    let fullLink = `https://github.com${href}`;
    // console.log(fullLink);
    repoPage(fullLink, href);
  }
}
