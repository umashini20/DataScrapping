const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

/*$(".org-page-navigation__item.m0").each((i,element) => {
        $(element).children("a#ember1425").attr("href")});*/ 

//Uthinksmart7*

//const scrapeResults = [];
let browser;
let urli = "https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22101174742%22%5D&keywords=restaurant&origin=FACETED_SEARCH&sid=S)o&spellCorrectionEnabled=false";

async function scrapeHeader(){
    try{
        //const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
        await page.type("input#username","umashini20@gmail.com");
        await page.type("input#password","Uthinksmart7*");
        await page.click("button.btn__primary--large",{delay:20});
        await page.waitForNavigation();
        await page.goto(
            urli
            );
        const content = await page.evaluate(() => document.body.innerHTML);
        const $ = await cheerio.load(content);
        const homes= $(".entity-result__title-text").map((i,element) => 
            $(element).children(".app-aware-link").attr("href")+"about/"
        ).get();
            /*const url = resultTitle.attr("href");
            const scrapeResult = {url};
            scrapeResults.push(scrapeResult);*/
         
        return homes;
    
    }catch(err){
        console.error(err);
    }

}

async function scrapeDescription(url,page){

    try{

        await page.goto(url,{waitUntil: "networkidle2" });
        const content = await page.evaluate(() => document.body.innerHTML);
        const $ = await cheerio.load(content);
        const industry = $("section > dl > dd:nth-child(4)").text();
        
        console.log("Industry: "+industry);
        
    }catch(e){
        console.error(e);
    }
    

}

async function main(){
    browser = await puppeteer.launch({headless: false});
    const descriptionPage = await browser.newPage();
    const homes = await scrapeHeader();
    for(var i = 0; i < homes.length; i++){

        await scrapeDescription(homes[i], descriptionPage);
    }
    
    //console.log(homes);
   
}

main();
