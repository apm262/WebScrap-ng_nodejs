const puppeteer = require('puppeteer');
const websites = require('./websites.json');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    //await page.goto('https://www.google.com');
    // await page.click('#L2AGLb > div');
    // await page.waitForSelector('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input');
    // await page.type('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input','facebook')
    // await page.click('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b');

    
    for(const website of websites){
        const scriptPath = path.join(__dirname,'scripts',website.scriptName);
        require(scriptPath)(page,website);
    }
  })();

