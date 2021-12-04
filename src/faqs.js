const log = require("debug")("saitofaq:lib");
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

export function parse(filename) {
  const obj = matter.read(filename);
  obj.slug = slugifyFilepath(obj.path);
  obj.data.priority = Number(obj.data.priority || 0);
  delete obj.orig;
  return obj;
}
