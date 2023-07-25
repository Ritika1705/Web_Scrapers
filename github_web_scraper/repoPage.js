const request = require("request");
const cheerio = require("cheerio");
const getIssuePageHtml = require("./issuePage");

function getReposPageHtml(url,reponame)
{
    request(url,cb);

    function cb(err, response, html) {
        if(err){
            console.log(err);
        }
        else {
            getRepoLinks(html);
            //console.log(html);
        }
    }

    function getRepoLinks(html)
    {
        let $ = cheerio.load(html);
        let repoElemarr = $(".Link.text-bold.wb-break-word");
        console.log("----------------------------------");
        console.log(reponame);
        console.log("----------------------------------");
        for(let i=0;i<repoElemarr.length;i++)
        {
            let repourl = "https://github.com" + $(repoElemarr[i]).attr("href");
            //console.log(repourl);
            let topic = repourl.split("/").pop();
            repourl += "/issues";
            console.log(topic);
            getIssuePageHtml(repourl, reponame, topic);
        }
    }


}

module.exports = getReposPageHtml;