const log = require("debug")("saitofaq:lib");

const matter = require("gray-matter");
const glob = require("glob");

export function parseFrequentlyAskedQuestions() {
    return parseAll(glob.sync("faq/*.md"));
}

export function parseAll(filenames) {
    return filenames.map(parse);
}

export function parse(filename) {
    return matter.read(filename);
}

