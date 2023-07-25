const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuePageHtml(url, reponame, topic)
{
    request(url,cb);

    function cb(err, response, html) {
        if(err){
            console.log(err);
        }
        else {
            getIssueLinks(html);
            //console.log(html);
        }
    }

    function getIssueLinks(html)
    {
        let $ = cheerio.load(html);
        let repoElemarr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr = [];

        for(let i=0;i<repoElemarr.length;i++)
        {
            let issue = $(repoElemarr[i]).attr("href");
            arr.push(issue);
            //console.log(issue);
        }
        let folderpath = path.join(__dirname, reponame);
        dirCreator(folderpath);
        let filepath = path.join(folderpath, topic + ".pdf");
        let text = JSON.stringify(arr);
        let pdfdoc = new pdfkit();
        pdfdoc.pipe(fs.createWriteStream(filepath));
        pdfdoc.text(text);
        pdfdoc.end(); 
        //fs.writeFileSync(filepath, JSON.stringify(arr)); 
        
    }


}

module.exports = getIssuePageHtml;

function dirCreator(folderpath)
{
    if(fs.existsSync(folderpath) == false)
    {
        fs.mkdirSync(folderpath);
    }
}