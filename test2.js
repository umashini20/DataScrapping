const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

/*$(".org-page-navigation__item.m0").each((i,element) => {
        $(element).children("a#ember1425").attr("href")});*/ 

//Uthinksmart7*


let index;
let browser;
let urli = "https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22101174742%22%5D&keywords=restaurant&origin=FACETED_SEARCH&page=3&sid=V%3A6";
//et urli = "https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22101174742%22%5D&keywords=restaurant&origin=FACETED_SEARCH&sid=ayI&spellCorrectionEnabled=false&page=" +index;
//let urli="https://www.linkedin.com/search/results/companies/?companyHqGeo=%5B%22101174742%22%5D&keywords=restaurant&origin=FACETED_SEARCH&sid=~U*";
let result;
async function scrapeHeader(){
    try{
        //const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
        await page.type("input#username","umashini20@gmail.com");
        await page.type("input#password","Uthinksmart7*");
        await page.click("button.btn__primary--large",{delay:20});
        await page.waitForNavigation();

      // for(index = 1; index<=2; index=index+1){

       
            await page.goto(
                
                urli
                  ,{waitUntil: "networkidle2" }
                );
            
            const content = await page.evaluate(() => document.body.innerHTML);
            const $ = await cheerio.load(content);
            const homes =$(".entity-result__title-text").map((i,element) => 
                $(element).children(".app-aware-link").attr("href")+"about/"
                
                
             );
           
            
           
            
             return homes;

            
       // }
      
    
      
          
         
        
    
    }catch(err){
        console.error(err);
    }

}
//\+?[0-9]{3}?[0-9]{3}?[0-9]{4,6}\d+
///[+\s\.]?[0-9]?[+\s\.]?[0-9]{3}?[-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{4,6}/gm  +1 888 778 3950
//[+\s\.]?[0-9]?[+\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{4,6}  (416) 863-6006
async function scrapeDescription(url,page){

    try{

        await page.goto(url,{waitUntil: "networkidle2" });
        const content = await page.evaluate(() => document.body.innerHTML);
        const $ = await cheerio.load(content);
        const title = $("h1").attr("title");
        const descrption = $(".artdeco-card").text();
        const free=descrption.replace(/[\r\n]/gm,'');
        const contactNo = free.match(/[+\s\.]?[0-9]?[+\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{4,6} /);

        let displayContactNo = "null";

        if(contactNo != null){
            displayContactNo = contactNo[0];

        }
        
        console.log("Title: "+title);
        console.log("Contact No: "+displayContactNo);

        return{title,displayContactNo};
        
    }catch(e){
        console.error(e);
    }
    

}

async function main(){
    browser = await puppeteer.launch({headless: false});
    const descriptionPage = await browser.newPage();
    const home = await scrapeHeader();
    for(var i = 0; i < home.length; i++){

        await scrapeDescription(home[i], descriptionPage);
     }
    
   
    
   
}

main();
