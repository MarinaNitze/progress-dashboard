import yaml from "js-yaml";
import markdownIt from "markdown-it";
import markdownLibrary from "./markdown.js";
import svgSprite from "eleventy-plugin-svg-sprite";
import eleventyAutoCacheBuster from "eleventy-auto-cache-buster";
import dateFilters from './filters/dateFilters.js'


const alphaSort = (a, b) => {
  if (a.data.title < b.data.title) {
    return -1;
  } else if (a.data.title > b.data.title) {
    return 1;
  } else {
    return 0;
  }
};

const topicList = [
  "background-checks",
  "emergency-placements",
  "supporting-older-youth",
  "caregiver-licensing",
  "general-engagement",
  "kin-engagement",
  "prevention",
  "recruitment",
  "retention",
  "supportive-relationships",
];

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyAutoCacheBuster);

  eleventyConfig.addPassthroughCopy("./images/");
  eleventyConfig.addPassthroughCopy("./js/");
  eleventyConfig.addPassthroughCopy("./admin/");

  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
  });

  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addNunjucksFilter("md", (markdownString) =>
    md.render(markdownString),
    );

  eleventyConfig.addPlugin(svgSprite, {
    path: "./icons", // relative path to SVG directory
    svgShortcode: "icon"
  });

  // Human-readable dates

  Object.keys(dateFilters).forEach(filterName => {
      eleventyConfig.addFilter(filterName, dateFilters[filterName])
  })

  // All strategies sorted alphabetically

  eleventyConfig.addCollection("strategiesAlpha", (collection) =>
    collection.getFilteredByGlob("strategies/*.md").sort(alphaSort)
  );

  for (let topic in topicList) {
    eleventyConfig.addCollection(`${topicList[topic]}-strategies`, function (collectionsApi) {
      return collectionsApi.getFilteredByTags('strategy', `${topicList[topic]}`).sort((a, b) => a.data.order - b.data.order);
    });
  }

  // Stories

  eleventyConfig.addCollection("stories", (collection) =>
    collection.getFilteredByGlob("stories/*.md")
  );

    // All resources
  eleventyConfig.addCollection("topics", (collection) =>
      collection.getFilteredByGlob("topics/*.md")
  );

  // All resources
  eleventyConfig.addCollection("resources", (collection) =>
      collection.getFilteredByGlob("resources/*.md")
  );

  eleventyConfig.addCollection("meetings", (collection) =>
      collection.getFilteredByGlob("meetings/*.md")
  );

  eleventyConfig.addFilter("find", function find(collection = [], title = "") {
    return collection.find(item => item.data.title === title);
  });

  // Resources featured on homepage

  eleventyConfig.addCollection("homeResources", (collection) =>
    collection.getFilteredByTags("homepage", "resource")
  );

}