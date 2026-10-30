import test from "node:test";
import assert from "node:assert/strict";
import { allResources } from "../src/data/resourcesData.js";
import {
  applyResourceFilters,
  countActiveResourceFilters,
  defaultResourceFilters,
} from "../src/utils/resourceUtils.js";

const filter = (changes = {}, search = "") =>
  applyResourceFilters(allResources, search, { ...defaultResourceFilters, ...changes });

test("search handles Azerbaijani casing and surrounding spaces", () => {
  const results = filter({}, "  ikigai  ");
  assert.equal(results.length, 15);
  assert.ok(results.every((resource) => resource.title === "İkigai"));
  assert.deepEqual(filter({}, "YAŞIL"), filter({}, "Yaşıl"));
  assert.equal(filter({}, "   ").length, allResources.length);
  assert.equal(filter({}, "mövcud olmayan resurs").length, 0);
});

test("education and subject filters apply together to actual demo data", () => {
  const results = filter({ educationLevel: "Magistr", categories: ["Psixologiya"] });
  assert.equal(results.length, 9);
  assert.ok(results.every((resource) => resource.educationLevel === "Magistr" && resource.subjects.includes("Psixologiya")));
  assert.equal(filter({ categories: ["Psixologiya"] }).length, 45);
  assert.equal(filter({ categories: ["Bədii Kitablar"] }).length, 18);
});

test("categories within one group use OR while different groups use AND", () => {
  const results = filter({ categories: ["Psixologiya", "Digər"], languages: ["Azərbaycan"], formats: ["PDF"] });
  assert.equal(results.length, 90);
  assert.equal(filter({ categories: ["Psixologiya"], languages: ["İngilis"] }).length, 0);
  assert.equal(filter({ formats: ["EPUB"] }).length, 0);
});

test("page count and search narrow the same result set", () => {
  const results = filter({ pageIndex: 2 }, "ikigai");
  assert.equal(results.length, 15);
  assert.ok(results.every((resource) => resource.pages <= 200));
  assert.equal(filter({ pageIndex: 1 }).length, 0);
});

test("sorting preserves the source collection and orders the filtered results", () => {
  const originalIds = allResources.map((resource) => resource.id);
  const downloads = filter({ sort: "downloads", educationLevel: "Bakalavr" });
  assert.ok(downloads.length > 0);
  assert.ok(downloads.every((resource, index) => index === 0 || downloads[index - 1].downloads >= resource.downloads));
  const oldest = filter({ sort: "oldest" });
  assert.equal(oldest[0].date, "06.07.2026");
  assert.equal(oldest.at(-1).date, "23.07.2026");
  assert.deepEqual(allResources.map((resource) => resource.id), originalIds);
});

test("last-week date filter excludes future records", () => {
  const asDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };
  const records = [-10, -2, 2].map((offset) => ({ ...allResources[0], id: String(offset), date: asDate(offset) }));
  const results = applyResourceFilters(records, "", { ...defaultResourceFilters, date: "week" });
  assert.deepEqual(results.map((resource) => resource.id), ["-2"]);
});

test("reset clears all active groups and restores every resource", () => {
  const selected = { educationLevel: "Magistr", categories: ["Psixologiya"], languages: ["Azərbaycan"], formats: ["PDF"], pageIndex: 2, date: "year", sort: "views" };
  assert.equal(countActiveResourceFilters(selected), 7);
  assert.equal(countActiveResourceFilters(defaultResourceFilters), 0);
  assert.equal(filter().length, 90);
});
