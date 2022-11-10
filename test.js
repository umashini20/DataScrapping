const puppeteer = require("puppeteer");
const cheerio = require("cheerio");



//Uthinksmart7*

const scrapeResults = [];
let browser;
let urli = "https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22101174742%22%5D&keywords=restaurant&origin=FACETED_SEARCH&sid=S)o&spellCorrectionEnabled=false";

async function scrapeHeader(){
    try{
       
        const page = await browser.newPage();
        await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
        await page.type("input#username","umashini20@gmail.com");
        await page.type("input#password","Uthinksmart7*");
        await page.click("button.btn__primary--large",{delay:20});
        await page.waitForNavigation();
        await page.goto(
            urli
            );
        const content = await page.content();
        const $ = await cheerio.load(content);
        $(".entity-result__title-text").each((index,element) => {
            const resultTitle = $(element).children(".app-aware-link");/*.attr("href")*/
            const url = resultTitle.attr("href");
            const scrapeResult = {url};
            scrapeResults.push(scrapeResult);
            
        });
        //console.log($("").text());
        //console.log(scrapeResults);
        return scrapeResults;
    
        



    }catch(err){
        console.error(err);
    }

}

async function scrapeDescription(url,page){

    try{

        await page.goto(url);

    }catch(e){
        console.error(e);
    }
    

}

async function main(){
    browser = await puppeteer.launch({headless: false});
    const descriptionPage = await browser.newPage();
    const restaurantWithHeaders = await scrapeHeader();
    for(var i = 0; i < restaurantWithHeaders.length; i++){

        await scrapeDescription(restaurantWithHeaders[i], descriptionPage);
    }
    
    //console.log(restaurantWithHeaders);
   
}

main();