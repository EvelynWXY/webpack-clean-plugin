const del = require("del");
const validateOptions = require("schema-utils");
const path = require("path");

const schema = {
  type: "object",
  properties: {
    exclude: {
      type: "string",
    },
  },
};

module.exports = class CleanPlugin {
  //若没有传递 options 则传递空字符串
  constructor(options = { exclude: "" }) {
    this.options = options;
    validateOptions(schema, options, "Clean Plugin"); // 验证 options 是否符合规范
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("CleanPlugin", (compilation, callback) => {
      let delFiles = [
        `${compiler.options.output.path}/**`,
        `!${compiler.options.output.path}/${this.options.exclude}`,
      ];
      console.log(delFiles);
      del(delFiles).then(() => {
        callback();
      });
    });
  }
};
