//This file is necessary in order to help Jest import underscore template files with the .html extension. Webpacker has this set in the webpack config file, but Jest isn't aware of the Webpack config. In package.json under the Jest config there is the option to set a custom transform preprocessor, which is what we're doing here. We're loading the NodeJS underscore-template-loader and returning it back to babel to be processed into a string that we can use in our tests. Note that it isn't really necessary to use babel for ES6 anymore unless we care about IE 11 compatibility. If we later decide we don't need it, we can use this configuration this config for the underscore-template-loader, but remove the babel-jest tranform preprocessor from the package.json.
const UnderscoreTemplateLoader = require('underscore-template-loader');

module.exports = {
    process(src, filename, config, options) {
        return UnderscoreTemplateLoader(src);
    }
}
