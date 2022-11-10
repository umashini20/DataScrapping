const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
//const ObjectsToCsv = require('objects-to-csv');



//Uthinksmart7*

const scrapeResults = [];
let browser;
let urli = "https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22101174742%22%5D&keywords=restaurant&origin=FACETED_SEARCH&sid=S)o&spellCorrectionEnabled=false";
let pagesToScrape = 2;
let currentPage = 1;
let data = [];

async function scrapeHeader(){
    try{
       
        browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
        await page.type("input#username","umashini20@gmail.com");
        await page.type("input#password","Uthinksmart7*");
        await page.click("button.btn__primary--large",{delay:20});
        await page.waitForNavigation();
        await page.goto(
            urli
            );
        while(currentPage<=pagesToScrape){

            const content = await page.content();
        const $ = await cheerio.load(content);
        $(".mb1").each((index,element) => {
            const resultTitle = $(element).find(".app-aware-link");/*.attr("href")*/
            const restaurantName = resultTitle.text();
            const url = resultTitle.attr("href");
            const typeOfIndustry = $(element).find(".entity-result__primary-subtitle");
            const typeAddress = typeOfIndustry.text();
            const scrapeResult = {restaurantName, url, typeAddress};
            scrapeResults.push(scrapeResult);
            
        });
        //console.log($("").text());
        //console.log(scrapeResults);
        if(currentPage<pagesToScrape){
            await page.click(".artdeco-pagination__button",{delay:20});
            await page.waitForSelector(".artdeco-pagination__button");

        }
        currentPage++;

        return scrapeResults;

        
        
    

        }
        
        



    }catch(err){
        console.error(err);
    }

}
/*async function createCsvFile(data){
    let csv = new ObjectsToCsv(data);
    await csv.toDisk('/restaurant.csv');
   
}*/


async function main(){
    
   
    const restaurantWithHeaders = await scrapeHeader();
    //await createCsvFile(restaurantWithHeaders);
    console.log(restaurantWithHeaders);
   
}

main();