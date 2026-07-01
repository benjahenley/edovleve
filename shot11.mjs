import puppeteer from "puppeteer-core";

const SCRATCH = "/private/tmp/claude-501/-Users-benjaminhenley-Desktop-DATA-Laburo-freelance-edovleve/3c81b23a-0bac-4e21-83ae-973056064b48/scratchpad";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1600 });
await page.goto("http://localhost:5174/#presencia", { waitUntil: "networkidle0" });
await page.evaluate(() => {
  document.getElementById("presencia").scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: `${SCRATCH}/rot-t0.png` });
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: `${SCRATCH}/rot-t1.png` });
await browser.close();
