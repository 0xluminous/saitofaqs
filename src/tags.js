const log = require("debug")("saitofaq:tags");
import * as faqs from "./faqs"

export function getAll() {
  const uniqueTags = new Set();
  const list = faqs.getAll();
  for (const faq of list) {
    const tags = faq.data.tags || [];
    for (const tag of tags) {
      uniqueTags.add(tag);
    }
  }
  return Array.from(uniqueTags);
}

export function getBySlug(slug) {
  const uniqueFaqs = new Set();
  const list = faqs.getAll();
  for (const faq of list) {
    const tags = faq.data.tags || [];
    if (tags.indexOf(slug) > -1) {
      uniqueFaqs.add(faq);
    }
  }
  return Array.from(uniqueFaqs);
}


export function getCloud() {
  const index = {};
  const all = faqs.getAll();
  for (const faq of all) {
    const tags = faq.data.tags || [];
    for (const tag of tags) {
      if (index[tag]) {
        index[tag] += 1;
      } else {
        index[tag] = 1;
      }
    }
  }

  const entries = Object.entries(index).sort((a, b) => {
    return b[1] - a[1];
  });

  return entries;
}

