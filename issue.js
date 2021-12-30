const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function issueHTML(fullLink, topic, repoName) {
  console.log(fullLink);
  axios
    .get(fullLink)
    .then((res) => {
      //  console.log(res.data);
      let html = res.data;
      getIssues(html);
    })
    .catch((err) => {
      console.log("Error");
    });

  function getIssues(html) {
    //console.log(html);
    let $ = cheerio.load(html);
    let issuesElemArr = $(
      ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
    );
    let arr = [];
    for (let i = 0; i < issuesElemArr.length; i++) {
      let link = $(issuesElemArr[i]).attr("href");
      //  console.log(link);
      let fullLink = `https://github.com${link}`;
      //console.log(fullLink);
      arr.push(fullLink);
    }
    console.log(topic, repoName);

    let folderPath = path.join(__dirname, topic);
    dirCreater(folderPath);
    let filePath = path.join(folderPath, repoName + ".pdf");

    let text = JSON.stringify(arr);
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();

    //fs.writeFileSync(filePath);
  }
}

module.exports = issueHTML;

function dirCreater(folderPath) {
  if (fs.existsSync(folderPath) === false) {
    fs.mkdirSync(folderPath);
  }
}
