const log = require("debug")("saitofaq:faqs");
const matter = require("gray-matter");
const glob = require("glob");
const path = require("path");

const faqsDirectory = path.join(process.cwd(), "faqs");

export function getAll(sorted=true) {
  const faqs = parseAll(glob.sync(path.join(faqsDirectory, "*.md")));
  if (!sorted) { return faqs }
  faqs.sort((a, b) => {
    if (a.data.priority > b.data.priority) { return -1 }
    if (a.data.priority < b.data.priority) { return 1 }
    return 0;
  });
  return faqs;
}

export function parseAll(filenames) {
  return filenames.map(parse);
}

export function getBySlug(slug) {
  const filepath = path.join(faqsDirectory, `${slug}.md`);
  return parse(filepath);
}

function slugifyFilepath(filepath) {
  return path.basename(filepath).replace(/\.md$/, "");
}

function normalize(obj) {
  obj.slug = slugifyFilepath(obj.path);
  obj.data.priority = Number(obj.data.priority || 0);
  delete obj.orig;
  return obj;
}

export function parse(filename) {
  return normalize(matter.read(filename));
}

export function getByTags(tags, excludeSlugs=null) {
  if (!tags) { tags = [] }
  if (!excludeSlugs) { excludeSlugs = [] }
  const grouped = {};
  const all = getAll();
  for (const faq of all) {
    if (excludeSlugs.indexOf(faq.slug) > -1) { continue }
    const faqTags = new Set(faq.data.tags || []);
    const intersections = new Set([...tags].filter(f => faqTags.has(f)));
    for (const intersection of intersections) {
      if (!grouped[intersection]) {
        grouped[intersection] = [faq];
      } else {
        grouped[intersection].push(faq);
      }
    }
  }

  return grouped;
}

export function getRelated(faq) {
  const tags = faq.data.tags || [];
  const related = getByTags(tags, [faq.slug]);
  return related;
}
