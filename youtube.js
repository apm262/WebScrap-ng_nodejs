const fs = require('fs');
const path = require('path');

module.exports = async (page, website) => {
    await page.goto(website.url);

    const { selectors } = website;

    await page.waitForSelector('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a');
    await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a');

    await page.waitForSelector(selectors.listVideos);

    const videoText = await page.evaluate((listVideos) => {
        const videos = document.querySelectorAll(listVideos);
        const videosText = [];
        for (const video of videos) {
            console.log(video.innerText);
            videosText.push(video.innerText);
        }
        return videosText;
    },selectors.listVideos);

    //console.log(videoText);

    const regExp = new RegExp('[A-z]+');

    const videoFinal = [];

    for (const text of videoText) {

        const textSplited = text.split('\n').filter((txt) => regExp.test(txt));
        const newVideo = {
            name:textSplited[0],
            chanel:textSplited[1],
            views:textSplited[2],
            dtAdded:textSplited[3]
        }
        videoFinal.push(newVideo);
    }

    // console.log(videoFinal)

    fs.writevSync(
        path.join(__dirname,`${website.scriptName}.json`) ,
        JSON.stringify(videoFinal),
        'utf8'
    );
    
};

// async function waitAndClick(page, selector){
//     await page.waitForSelector(selector);
//     await page.click(selector);
// }