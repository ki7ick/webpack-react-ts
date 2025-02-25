// loaders/autoCSSModulesLoader.js

const { extname } = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const CSS_EXT_NAMES = [".css", ".less", ".sass", ".scss", ".stylus", ".styl"];

module.exports = function (source) {
  const callback = this.async();
  const inputFilePath = this.resource;

  // 检查是否有需要处理的 CSS 文件
  if (CSS_EXT_NAMES.includes(extname(inputFilePath))) {
    return callback(null, source);
  }

  try {
    // 解析 AST，启用 JSX 和 TypeScript 插件
    const ast = parser.parse(source, {
      sourceType: "module",
      plugins: [
        "typescript",
        "jsx",
        "dynamicImport",
        "exportDefaultFrom",
        "classProperties",
      ],
    });

    // 遍历 AST，找到 ImportDeclaration
    traverse(ast, {
      ImportDeclaration(path) {
        const { node } = path;
        const { specifiers, source } = node;
        const { value: sourceValue } = source;

        if (CSS_EXT_NAMES.includes(extname(sourceValue))) {
          // 检查是否有 Specifiers 是空的，说明是全局样式
          if (specifiers.length === 0) {
            source.value = `${sourceValue}?global`;
          } else {
            source.value = `${sourceValue}?css_modules`;
          }
        }
      },
    });

    // 将修改后的 AST 重新生成为代码
    const newSource = generate(ast, {}, source).code;

    callback(null, newSource);
  } catch (error) {
    callback(error);
  }
};
