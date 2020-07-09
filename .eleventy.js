module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('images')
    eleventyConfig.addPassthroughCopy('admin')

    // added luxon for readable dates
    const {
        DateTime
    } = require("luxon");

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat('yy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat("dd LLL yyyy");
    });

    // added markdown-it & implicit-figures plugin
    const markdownIt = require('markdown-it');
    let implicitFigures = require('markdown-it-implicit-figures');
    let options = {
        html: true,
        breaks: true,
        linkify: true
      };
    let markdownLib = markdownIt(options).use(implicitFigures);
    
    eleventyConfig.setLibrary("md", markdownLib);
};