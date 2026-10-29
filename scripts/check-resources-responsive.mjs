import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import process from "node:process";
import { Buffer } from "node:buffer";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = resolve(import.meta.dirname, "..");
const output = join(root, ".responsive-qa.local", process.argv[2] ?? "latest");
await mkdir(output, { recursive: true });
// Keep Chrome's generated HTML outside Vite's watched workspace.
const profile = await mkdtemp(join(tmpdir(), "cothink-responsive-"));
const executable = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const baseUrl = process.env.RESOURCE_TEST_URL ?? "http://127.0.0.1:5173";
const touchOnly = process.argv.includes("--touch-only");
const detailsOnly = process.argv.includes("--details-only");
const chrome = spawn(executable, ["--headless=new", "--disable-gpu", "--disable-extensions", "--disable-background-networking", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true, stdio: "ignore" });
let launchError;
chrome.on("error", (error) => { launchError = error; });
let socket;
const pending = new Map();
const exceptions = [];
const report = { widths: [], search: [], details: [], interactions: [], exceptions };
let sequence = 0;
let sessionId;

async function until(callback, description, timeout = 12000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (launchError) throw launchError;
    const result = await callback();
    if (result) return result;
    await delay(80);
  }
  throw new Error(`Timed out: ${description}`);
}

function command(method, params = {}, session = sessionId) {
  return new Promise((resolveCommand, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve: resolveCommand, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(session ? { sessionId: session } : {}) }));
  });
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ": " + result.exceptionDetails.exception?.description);
  return result.result.value;
}

async function click(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:"center",inline:"nearest"})`);
  const point = await evaluate(`(() => {const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);
  await command("Input.dispatchMouseEvent", { type: "mouseMoved", ...point });
  await command("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, ...point });
  await command("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, ...point });
}

async function settle() {
  await until(() => evaluate(`(() => {const t=document.querySelector('[aria-roledescription="karusel"] > div'); const s=t?.querySelector('[aria-roledescription="slayd"][aria-hidden="false"]');return t&&s&&Math.abs(t.scrollLeft-s.offsetLeft+t.offsetLeft)<2})()`), "carousel alignment");
  await delay(200);
}

async function setWidth(width) {
  await command("Emulation.setDeviceMetricsOverride", { width, height: width < 768 ? 900 : 1000, deviceScaleFactor: 1, mobile: false });
  await delay(120);
}

async function screenshot(name) {
  const result = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(join(output, name), Buffer.from(result.data, "base64"));
}

async function typeSearch(value) {
  await evaluate(`(() => {const i=document.querySelector('input[placeholder="Axtar"]');i.focus();i.select()})()`);
  if (value) await command("Input.insertText", { text: value });
  else {
    await command("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
    await command("Input.dispatchKeyEvent", { type: "keyUp", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
  }
  await delay(120);
}

async function dragHero(touch = false) {
  const selector = '[aria-roledescription="slayd"][aria-hidden="false"] img';
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:"center",inline:"nearest"})`);
  const start = await evaluate(`(() => {const image=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:image.left+image.width*0.8,y:Math.max(1,Math.min(innerHeight-1,image.top+image.height/2)),left:document.querySelector('[aria-roledescription="karusel"] > div').scrollLeft,title:document.querySelector('[aria-roledescription="slayd"][aria-hidden="false"] h3').textContent}})()`);
  const point = (distance) => ({ x: start.x - distance, y: start.y });
  if (touch) {
    await command("Emulation.setTouchEmulationEnabled", { enabled: true });
    await command("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [point(0)] });
  } else {
    await command("Input.dispatchMouseEvent", { type: "mouseMoved", ...point(0) });
    await command("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, ...point(0) });
  }
  for (let distance = 20; distance <= 120; distance += 20) {
    if (touch) await command("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [point(distance)] });
    else await command("Input.dispatchMouseEvent", { type: "mouseMoved", button: "left", buttons: 1, ...point(distance) });
    await delay(20);
  }
  const during = await evaluate(`document.querySelector('[aria-roledescription="karusel"] > div').scrollLeft`);
  if (touch) await command("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  else await command("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, ...point(120) });
  await settle();
  const after = await evaluate(`document.querySelector('[aria-roledescription="slayd"][aria-hidden="false"] h3').textContent`);
  if (touch) await command("Emulation.setTouchEmulationEnabled", { enabled: false });
  return { followedPointer: during > start.left + 60, changedSlide: after !== start.title };
}

try {
  const address = await until(async () => {
    try { return (await readFile(join(profile, "DevToolsActivePort"), "utf8")).trim().split(/\r?\n/); }
    catch (error) { if (error.code !== "ENOENT") throw error; return false; }
  }, "Chrome launch");
  socket = new WebSocket(`ws://127.0.0.1:${address[0]}${address[1]}`);
  await new Promise((resolveOpen, reject) => { socket.addEventListener("open", resolveOpen, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(String(data));
    if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.exception?.description ?? message.params.exceptionDetails.text);
    const response = pending.get(message.id);
    if (!response) return;
    pending.delete(message.id);
    clearTimeout(response.timer);
    if (message.error) response.reject(new Error(JSON.stringify(message.error)));
    else response.resolve(message.result);
  });
  const target = await command("Target.createTarget", { url: "about:blank" }, null);
  sessionId = (await command("Target.attachToTarget", { targetId: target.targetId, flatten: true }, null)).sessionId;
  await command("Page.enable");
  await command("Runtime.enable");
  await setWidth(390);
  await command("Page.navigate", { url: `${baseUrl}/library/resources` });
  await until(() => evaluate(`Boolean(document.querySelector('[aria-roledescription="karusel"]'))`), "resources page");
  await evaluate("document.fonts.ready.then(()=>true)");

  const widths = touchOnly || detailsOnly ? [] : [320, 360, 375, 390, 414, 430, 639, 640, 767, 768, 769, 1023, 1024, 1280, 1440, 1920];
  for (const width of widths) {
    await setWidth(width);
    // Fresh navigation checks the actual initial sidebar state at this width.
    await command("Page.reload");
    await delay(200);
    await until(() => evaluate(`Boolean(document.querySelector('[aria-roledescription="karusel"]'))`), "resources reload");
    await settle();
    const slides = [];
    for (let index = 0; index < 4; index++) {
      await click(`[aria-roledescription="slayd"][aria-hidden="false"] [aria-label="Kitab seçimi"] button:nth-child(${index + 1})`);
      await settle();
      const measurement = await evaluate(`(() => {
        const slide=document.querySelector('[aria-roledescription="slayd"][aria-hidden="false"]');
        const hero=document.querySelector('[aria-roledescription="karusel"]');
        const cover=slide.querySelector('img').getBoundingClientRect();
        const dots=slide.querySelector('[aria-label="Kitab seçimi"]').getBoundingClientRect();
        const bounds=slide.getBoundingClientRect();
        const overflow=[...slide.querySelectorAll('h3,p,a,img,button')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left<bounds.left-1||r.right>bounds.right+1||e.scrollWidth>e.clientWidth+1)}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,75),width:e.clientWidth,scrollWidth:e.scrollWidth}));
        return {title:slide.querySelector('h3').textContent,overflow,dotsCentered:Math.abs((cover.left+cover.right-dots.left-dots.right)/2)<2,dotsBelowBook:dots.top>=cover.bottom-2,heroWithinViewport:hero.getBoundingClientRect().left>=-1&&hero.getBoundingClientRect().right<=innerWidth+1,pageOverflow:document.documentElement.scrollWidth>innerWidth+1};
      })()`);
      slides.push(measurement);
      if (index === 0 && [320, 390, 768, 1024, 1440].includes(width)) {
        await evaluate(`document.querySelector('[aria-roledescription="karusel"]').scrollIntoView({block:"start"})`);
        await screenshot(`hero-${width}.png`);
      }
    }
    const passed = slides.every((slide) => !slide.overflow.length && slide.dotsCentered && slide.dotsBelowBook && slide.heroWithinViewport && !slide.pageOverflow);
    report.widths.push({ width, passed, slides });
    console.log(`Hero ${width}px: ${passed ? "PASS" : "FAIL"}`);
  }

  await setWidth(390);
  for (const query of touchOnly || detailsOnly ? [] : ["Sfggg", "ikigai", "YAŞIL", ""]) {
    await typeSearch(query);
    const state = await evaluate(`({hero:Boolean(document.querySelector('[aria-roledescription="karusel"]')),result:document.querySelector('[aria-label="Axtarış nəticələri"]')?.textContent ?? null})`);
    const passed = query ? !state.hero && Boolean(state.result) && (query !== "Sfggg" || state.result.includes("Nəticələr (0)")) : state.hero;
    report.search.push({ query, passed, ...state });
    console.log(`Search ${JSON.stringify(query)}: ${passed ? "PASS" : "FAIL"}`);
  }
  if (!touchOnly && !detailsOnly) {
    await typeSearch("ikigai");
    await click('button[aria-label="Axtarışı təmizlə"]');
    const cleared = await evaluate(`document.querySelector('input[aria-label="Resursları axtar"]').value === "" && Boolean(document.querySelector('[aria-roledescription="karusel"]'))`);
    report.search.push({ action: "clear search button", passed: cleared });
    console.log(`Clear search button: ${cleared ? "PASS" : "FAIL"}`);
  }
  await settle();
  for (const width of detailsOnly ? [] : touchOnly ? [360] : [360, 768, 1280]) {
    await setWidth(width);
    await settle();
    await click('[aria-roledescription="slayd"][aria-hidden="false"] [aria-label="Kitab seçimi"] button:nth-child(2)');
    await settle();
    const before = await evaluate(`document.querySelector('[aria-roledescription="slayd"][aria-hidden="false"] h3').textContent`);
    await delay(5250);
    await settle();
    const after = await evaluate(`document.querySelector('[aria-roledescription="slayd"][aria-hidden="false"] h3').textContent`);
    report.interactions.push({ width, action: "autoplay after dot click", passed: before !== after });
    console.log(`Autoplay after click ${width}px: ${before !== after ? "PASS" : "FAIL"}`);
    const mouse = await dragHero();
    report.interactions.push({ width, action: "mouse drag", passed: mouse.followedPointer && mouse.changedSlide, ...mouse });
    console.log(`Mouse drag ${width}px: ${mouse.followedPointer && mouse.changedSlide ? "PASS" : "FAIL"}`);
    if (width === 360) {
      const touch = await dragHero(true);
      report.interactions.push({ width, action: "touch swipe", passed: touch.followedPointer && touch.changedSlide, ...touch });
      console.log(`Touch swipe ${width}px: ${touch.followedPointer && touch.changedSlide ? "PASS" : "FAIL"}`);
    }
    if (width >= 768) {
      await click('button[aria-label="Collapse sidebar"], button[aria-label="Expand sidebar"]');
      await settle();
      const aligned = await evaluate(`(() => {const t=document.querySelector('[aria-roledescription="karusel"] > div');const s=t.querySelector('[aria-roledescription="slayd"][aria-hidden="false"]');return Math.abs(t.scrollLeft-s.offsetLeft+t.offsetLeft)<2})()`);
      report.interactions.push({ width, action: "sidebar resize", passed: aligned });
      console.log(`Sidebar resize ${width}px: ${aligned ? "PASS" : "FAIL"}`);
    }
  }

  await command("Page.navigate", { url: `${baseUrl}/library/resources/detail/bedii-2` });
  await until(() => evaluate(`Boolean([...document.querySelectorAll('button')].find(e=>e.textContent.includes('Oxumağa başla')))`), "detail page");
  for (const width of touchOnly ? [] : [320, 360, 390, 430, 768, 1024, 1186, 1280, 1366, 1440, 1536, 1920]) {
    await setWidth(width);
    await command("Page.reload");
    await delay(200);
    await until(() => evaluate(`Boolean([...document.querySelectorAll('button')].find(e=>e.textContent.includes('Oxumağa başla')))`), "detail reload");
    const measurement = await evaluate(`(() => {const first=[...document.querySelectorAll('button')].find(e=>e.textContent.includes('Oxumağa başla'));const group=first.parentElement;const buttons=[...group.querySelectorAll('button')].map(b=>{const r=b.getBoundingClientRect();return {width:r.width,height:r.height,top:r.top,center:(r.left+r.right)/2,text:b.textContent.trim(),overflow:b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+1}});const r=group.getBoundingClientRect();return {buttons,equal:buttons.every(b=>Math.abs(b.width-buttons[0].width)<1&&Math.abs(b.height-buttons[0].height)<1),centered:innerWidth>=640||buttons.every(b=>Math.abs(b.center-(r.left+r.right)/2)<1),singleDesktopRow:innerWidth<1024||buttons.every(b=>Math.abs(b.top-buttons[0].top)<1),noTextOverflow:buttons.every(b=>!b.overflow),withinViewport:buttons.every(b=>b.center-b.width/2>=0&&b.center+b.width/2<=innerWidth)}})()`);
    const passed = measurement.equal && measurement.centered && measurement.singleDesktopRow && measurement.noTextOverflow && measurement.withinViewport;
    report.details.push({ width, passed, ...measurement });
    console.log(`Detail buttons ${width}px: ${passed ? "PASS" : "FAIL"}`);
    if ([390, 1280].includes(width)) {
      await evaluate(`([...document.querySelectorAll('button')].find(e=>e.textContent.includes('Oxumağa başla'))).scrollIntoView({block:"center"})`);
      await screenshot(`buttons-${width}.png`);
    }
  }
  await writeFile(join(output, "report.json"), JSON.stringify(report, null, 2));
  const failures = [...report.widths, ...report.search, ...report.details, ...report.interactions].filter((test) => !test.passed);
  console.log(`Report: ${join(output, "report.json")}`);
  assert.equal(exceptions.length, 0, `Browser exceptions: ${exceptions.join("; ")}`);
  assert.equal(failures.length, 0, `${failures.length} checks failed; see report.json`);
} finally {
  await writeFile(join(output, "report.json"), JSON.stringify(report, null, 2));
  if (socket?.readyState === WebSocket.OPEN) {
    await command("Browser.close", {}, null).catch(() => {});
    socket.close();
  }
  if (chrome.exitCode === null) chrome.kill();
}
