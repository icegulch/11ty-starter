import "dotenv/config"; // Loads .env variables immediately
import { minify } from "html-minifier-terser";

export default function (eleventyConfig) {

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.addPassthroughCopy({ "static": "/" });

  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
    dynamicPartials: true
  });

  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (process.env.NODE_ENV === "production" && this.page.outputPath?.endsWith(".html")) {
      const minified = await minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      });
      return minified;
    }
    return content;
  });

};