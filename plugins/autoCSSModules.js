const { extname } = require("path");

const CSS_EXT_NAMES = [".css", ".less", ".sass", ".scss", ".stylus", ".styl"];

module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const {
          specifiers,
          source,
          source: { value },
        } = path.node;
        if (specifiers.length && CSS_EXT_NAMES.includes(extname(value))) {
          source.value = `${value}?css_modules`;
        }
      },
    },
  };
};
