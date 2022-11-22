const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

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
                //urli
                "https://www.linkedin.com/in/umashini-silva-6aa710224/"
                ,{delay:1000});
            

    
            const content = await page.content();
            const $ = await cheerio.load(content);

            $(".pv-text-details__separator").each((index,element) => {
                const resultTitle = $(element).find(".ember-view");/*.attr("href")*/
                //const restaurantName = resultTitle.text();
                const url = resultTitle.attr("href");
                //const typeOfIndustry = $(element).find(".entity-result__primary-subtitle");
                //const typeAddress = typeOfIndustry.text();
                //const scrapped = false; //url is not used still.
                const scrapeResult = {/*restaurantName,*/ url};
                scrapeResults.push(scrapeResult);
                //console.log(scrapeResults);

               
                
                
            });
           
            //console.log("At page no : "+index);
            
            
           

        
        
        return scrapeResults;
       
    }catch(err){
        console.error(err);
    }

}
async function main(){
    
    //await connectToMongoDb();
    const restaurantWithHeaders = await scrapeHeader();
    //await createCsvFile(restaurantWithHeaders);
    console.log(restaurantWithHeaders);
   
}

main();