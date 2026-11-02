import assert from "node:assert/strict";

// Exercise the controls that are shared by the resource pages after extraction.
export async function checkResourceFlows({ command, evaluate, click, until, delay, setWidth, screenshot, typeSearch, baseUrl, report }) {
  const record = (action, passed) => {
    report.flows.push({ action, passed });
    assert.ok(passed, action);
  };
  const navigate = async (path, selector) => {
    await command("Page.navigate", { url: `${baseUrl}${path}` });
    await until(() => evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`), path);
  };
  const clickText = async (text, selector = "button") => {
    const point = await evaluate(`(() => {
      const element = [...document.querySelectorAll(${JSON.stringify(selector)})].find(e => e.textContent.trim() === ${JSON.stringify(text)});
      if (!element) throw new Error('Missing control: ' + ${JSON.stringify(text)});
      element.scrollIntoView({block:'center'});
      const r = element.getBoundingClientRect();
      return {x:r.left+r.width/2,y:r.top+r.height/2};
    })()`);
    await command("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, ...point });
    await command("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, ...point });
    await delay(120);
  };
  const escape = async () => {
    await command("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await command("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await delay(120);
  };

  await setWidth(1280);
  await navigate("/library/resources", 'input[aria-label="Resursları axtar"]');
  await click('a[href="/library/resources/category/bedii-kitablar"]');
  await until(() => evaluate("location.pathname.endsWith('/category/bedii-kitablar') && document.querySelectorAll('article').length === 15"), "category link and results");
  record("category first page", await evaluate("document.querySelectorAll('article').length === 15"));
  await click('button[aria-label="Növbəti"]');
  record("category second page", await evaluate("document.querySelectorAll('article').length === 3"));
  await typeSearch("ikigai");
  record("category search resets pagination", await evaluate("document.querySelectorAll('article').length === 3 && !document.querySelector('nav[aria-label=Pagination]')"));
  await click('button[aria-label="Axtarışı təmizlə"]');
  record("category clear restores first page", await evaluate("document.querySelectorAll('article').length === 15 && document.querySelector('button[aria-label=Əvvəlki]').disabled"));

  for (const section of ["latest", "popular", "recommended"]) {
    await navigate(`/library/resources/${section}`, "article");
    record(`${section} list`, await evaluate("document.querySelectorAll('article').length === 15"));
    await typeSearch("Sfggg");
    record(`${section} empty search`, await evaluate("!document.querySelector('article') && document.body.textContent.includes('Nəticə tapılmadı.')"));
    await click('button[aria-label="Axtarışı təmizlə"]');
    record(`${section} clear search`, await evaluate("document.querySelectorAll('article').length === 15"));
  }

  await navigate("/library/resources", 'input[aria-label="Resursları axtar"]');
  await clickText("Filtrlə");
  await clickText("Magistr", '[role="dialog"] label');
  await clickText("Psixologiya", '[role="dialog"] label');
  await clickText("PDF", '[role="dialog"] label');
  await clickText("Tətbiq et");
  record("combined filter applies", await evaluate("document.querySelector('[aria-label=\"Axtarış nəticələri\"]').textContent.includes('Nəticələr (9)') && !document.querySelector('[role=dialog]') && document.body.style.overflow !== 'hidden'"));
  await clickText("Filtrlə3");
  record("filter draft restored", await evaluate("document.querySelectorAll('[role=dialog] input:checked').length === 3"));
  await clickText("Filtrləri sıfırla");
  await escape();
  record("closing discards draft reset", await evaluate("document.querySelector('[aria-label=\"Axtarış nəticələri\"]').textContent.includes('Nəticələr (9)')"));
  await clickText("Axtarışı və filtrləri sıfırla");
  record("reset restores hero", await evaluate("Boolean(document.querySelector('[aria-roledescription=karusel]'))"));

  await navigate("/library/resources/detail/bedii-2", "h1");
  await clickText("Saxla");
  record("detail bookmark controls share state", await evaluate("document.querySelectorAll('button[aria-pressed=true]').length === 2"));
  await click('button[aria-label="Yadda saxla"]');
  record("detail bookmark toggles off", await evaluate("document.querySelectorAll('button[aria-pressed=true]').length === 0"));
  await clickText("Daha çox göstər");
  record("description expands", await evaluate("[...document.querySelectorAll('button')].some(e=>e.textContent.includes('Daha az göstər'))"));
  await clickText("Faydalı oldu");
  record("rating selection", await evaluate("[...document.querySelectorAll('button')].find(e=>e.textContent.includes('Faydalı oldu')).className.includes('bg-[#D1FAE5]')"));
  await clickText("Paylaş");
  record("share opens with resource links", await evaluate("document.querySelector('a[aria-label=LinkedIn]').href.includes(encodeURIComponent(location.href))"));
  await screenshot("share-refactor.png");
  await escape();
  record("share closes with Escape", await evaluate("!document.querySelector('a[aria-label=LinkedIn]')"));
  await clickText("Oxumağa başla");
  await until(() => evaluate("location.pathname.includes('/read/bedii-2')"), "reader link");

  for (const variant of ["read", "slide"]) {
    await navigate(`/library/resources/${variant}/bedii-2`, "header input[type=number]");
    const book = variant === "read";
    record(`${variant} initial page`, await evaluate(`document.querySelector('input[type=number]').value === '${book ? 257 : 4}'`));
    await clickText("+");
    record(`${variant} zoom in`, await evaluate("[...document.querySelectorAll('button')].some(e=>e.textContent.trim()==='110%')"));
    await clickText("110%");
    record(`${variant} reset zoom`, await evaluate("[...document.querySelectorAll('button')].some(e=>e.textContent.trim()==='100%')"));
    await click('button[aria-label="Yadda saxla"]');
    record(`${variant} bookmark`, await evaluate("document.querySelector('button[aria-label=\"Yadda saxla\"] svg').getAttribute('fill') === '#EA580C'"));
    if (!book) await click('button[aria-label="İşarələ / Rəng seç"]');
    await clickText("Qırmızı");
    record(`${variant} color selection`, await evaluate(book
      ? "[...document.querySelectorAll('input[type=text]')].some(e=>e.value==='#EF4444')"
      : "[...document.querySelectorAll('div[style]')].some(e=>e.style.background.includes('rgb(239, 68, 68)'))"));
    await click('button[aria-label="İşarələ / Rəng seç"]');
    await click('button[aria-label="Axtar"]');
    record(`${variant} search panel`, await evaluate(`Boolean(document.querySelector('input[placeholder="${book ? "Kitab" : "Prezentasiya"} daxilində axtar..."]'))`));
    await clickText("Bağla");
    const targetPage = book ? 258 : 5;
    await clickText(String(targetPage), "aside > div > span");
    record(`${variant} thumbnail navigation`, await evaluate(`document.querySelector('input[type=number]').value === '${targetPage}'`));
    await delay(400);
    await screenshot(`${variant}-refactor.png`);
  }

  for (const path of ["category/unknown", "detail/unknown", "unknown"]) {
    await navigate(`/library/resources/${path}`, "main");
    await until(() => evaluate("document.body.textContent.includes('tapılmadı.')"), "not found state");
    record(`${path} fallback`, true);
  }
}
