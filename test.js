const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const url ="https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22101174742%22%5D&keywords=restaurant&origin=FACETED_SEARCH&sid=~U*";
//Uthinksmart7*

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
                
                 url
                  ,{waitUntil: "networkidle2" }
                );
            
            const content = await page.evaluate(() => document.body.innerHTML);
            const $ = await cheerio.load(content);
            const links =$(".entity-result__title-text").map((i,element) => 
                $(element).children(".app-aware-link").attr("href")+"about/"
                
                
            );
           
            return links;
           
           
   
    }catch(err){
        console.error(err);
    }

}