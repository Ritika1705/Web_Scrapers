let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./repoPage");

request(url, cb);

function cb(err, response, html) {
    if(err){
        console.log(err);
    }
    else {
        getTopicLinks(html);
    }
}

function getTopicLinks(html) {
    let $ = cheerio.load(html);
    let linkElemarr = $(".no-underline.d-flex.flex-column.flex-justify-center");

    for(let i=0;i<linkElemarr.length;i++)
    {
        let href = "https://github.com" + $(linkElemarr[i]).attr("href");
        let reponame = href.split("/").pop();
        getReposPageHtml(href,reponame);
        console.log(href);
    }
}