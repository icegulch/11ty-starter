import "dotenv/config"; // Loads .env variables immediately
import { minify } from "html-minifier-terser";

export default function (eleventyConfig) {

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.addPassthroughCopy("src/assets");

  // 2. LiquidJS Fine-tuning (Optional)
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,      // Makes 0 and "" falsy (more like standard JS)
    dynamicPartials: true // Required if you use variables in {% include %}
  });

  eleventyConfig.addBundle("css");
  // eleventyConfig.addBundle("js"); // Uncomment when ready to use {% js %}

  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (process.env.NODE_ENV === "production" && this.page.outputPath?.endsWith(".html")) {
      const minified = await minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true // This minifies your {% getBundle "css" %} output too!
      });
      return minified;
    }
    return content;
  });

};