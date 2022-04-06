module.exports = async (page, website) => {
    await page.goto(website.url);

    await page.waitForTimeout(10000)

    await page.waitForSelector('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a');
    await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a');
};

async function waitAndClick(page, selector){
    await page.waitForSelector(selector);
    await page.click(selector);
}