# V1.0

> react webpack typescript集成

## 步骤

1. 创建项目文件夹
2. 安装git：`git init`，创建.gitignore文件
3. 安装npm：`npm init`，自动创建package.json文件
4. 安装webpack相关：`npm install --save-dev webpack` 和 `npm install --save-dev webpack-cli` 和 `npm install --save-dev webpack-dev-server` 和 `npm install --save-dev html-webpack-plugin`，创建webpack.config.js文件，package.json加入start命令（见文件）
5. 安装react： `npm install --save react` 和 `npm insatll --save react-dom` 和 `npm install --save @types/react` 和 `npm insatll --save @types/react-dom`
6. 安装typescript `npm install --save typescript`，创建tsconfig.json文件
7. 安装typescript预编译器ts-loader `npm install ts-loader --save-dev`
8. 编辑tsconfig.json（见文件）
9. 编辑webpack.config.js（见文件）

## 心得

* 安装webpack——命令：`npm install --save-dev webpack`，如果是webpack4+ ，还需要安装CLI，命令：`npm install --save-dev webpack-cli`（因为在webpack 3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们）
* webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 publicPath 选项进行修改
* HtmlWebpackPlugin 会默认生成 index.html 文件，以关联动态生成的可能具有hash值的js文件，且可以进行针对性的动态赋值到index.html中，一般用于单页面应用
* externals: {"react": "React","react-dom": "ReactDOM"} 这是 https://www.tslang.cn/docs/handbook/react-&-webpack.html 中的webpack配置的一段，这里我们是将react及react-dom打包至js中，如果加上这段话，意思是防止将react,react-dom这些 import 的包(package)打包到 bundle 中，而需要在html中以CDN表示