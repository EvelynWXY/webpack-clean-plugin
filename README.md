## 执行命令 调试代码
```
npm run build
serve -s dist
```

### 实现一个markdown-loader，核心功能是处理 markdown 文件，将其变成 html，首先在 npm 官网中搜索一个能把 markdown 变成 html 的工具，这里使用 markdown-it
```
npm install markdown-it --save // 安装markdown-it
```

### 创建markdown-loader.js文件

```
const { getOptions } = require("loader-utils"); // 获取参数
const validateOptions = require("schema-utils"); // 校验用户在使用时传递的参数是否正确
const MarkdownIt = require("markdown-it"); //

// 校验用户传递的参数是否符合规则
const schema = {
  type: "object",
  properties: {
    html: {
      type: "boolean",
    },
    linkify: {
      type: "boolean",
    },
  },
};

module.exports = function (source) {
  const options = getOptions(this);
  const md = MarkdownIt(options);

  validateOptions(schema, options); // 验证用户传递的参数是否符合规定的规则

  return md.render(source); // 调用已有的markdown-it工具 把 source 变成 html 并渲染  
};
```
### 使用 markdown-loader，先使用 markdown-loader 处理 markdown 返回 html 字符串，再使用 html-loader将其放进 html 中
```
module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "markdown-loader",
            options: {
              html: true, // 允许插件里传递 html 参数
            },
          },
        ],
      },
    ]
}
```