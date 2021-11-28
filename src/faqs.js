const log = require("debug")("saitofaq:lib");
const matter = require("gray-matter");
const glob = require("glob");
const path = require("path");

const faqsDirectory = path.join(process.cwd(), "faqs");

export function getAll() {
  return parseAll(glob.sync(path.join(faqsDirectory, "*.md")));
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
  return obj;
}
