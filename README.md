## 执行命令 调试代码
```
npm run build
serve -s dist
```

### 实现 CleanPlugin，主要功能是：清理 dist 目录保留指定文件 创建webpack-clean-plugin.js文件

```

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
      del(delFiles).then(() => {
        callback();
      });
    });
  }
};
```
### CleanPlugin 的使用，清除 dist 目录里除 a 之外的文件
```
const CleanPlugin = require("./plugins/clean-plugin.js");   

module.exports ={ 
  // ... 这里是其他配置 ...      
  plugins:[     
    new CleanPlugin({ exclude: "a" }),   
  ], 
};
```