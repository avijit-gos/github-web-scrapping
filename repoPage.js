const cheerio = require("cheerio");
const axios = require("axios");
const issueHTML = require("./issue");

function repoPage(fullLink, href) {
  axios
    .get(fullLink)
    .then((res) => {
      //console.log(res.data);
      let html = res.data;
      getReposLinks(html);
    })
    .catch((err) => {
      console.log("Error");
    });

  function getReposLinks(html) {
    let $ = cheerio.load(html);
    let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
    const topic = href.split("/").pop();
    //  console.log(`Topic Name: ${topic}`);

    for (let i = 0; i < 8; i++) {
      let twoAnchors = $(headingsArr[i]).find("a");
      let link = $(twoAnchors[1]).attr("href");
      //  console.log(link);
      let repoName = link.split("/").pop();
      // console.log(repoName);
      let fullLink = `https://github.com${link}/issues`;
      //  console.log(fullLink);
      issueHTML(fullLink, topic, repoName);
    }
  }
}

module.exports = repoPage;
