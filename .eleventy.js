/** @type {import("@11ty/eleventy").UserConfig} */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets/css");
  eleventyConfig.addWatchTarget("src/assets/js");

  // Sessions: all session notes in content/sessions except index, sorted by date desc
  eleventyConfig.addCollection("sessions", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/sessions/*.md")
      .filter((item) => !item.filePathStem.endsWith("/index"))
      .sort((a, b) => new Date(b.data.date || 0) - new Date(a.data.date || 0));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
