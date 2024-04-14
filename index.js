// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const ObjectsToCsv = require("objects-to-csv");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // locate and save all articles with a class of titleline
  const allArticles = await page.$$eval("span.titleline", (articleDetails) => {
    return articleDetails.map((article) => {
      const url = article.querySelector("a").getAttribute("href");
      const title = article.querySelector("a").innerHTML;

      return { title: title, url: url };
    });
  });

  // filtering articles to top 10 entries only
  let tenArticles = allArticles.slice(0, 10);

  // write to CSV file
  let writeFile = new ObjectsToCsv(tenArticles);
  writeFile.toDisk("./articles.csv");
}

(async () => {
  await saveHackerNewsArticles();
})();
