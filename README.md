# V1.0

> react webpack typescript集成

## 步骤

1. 创建项目文件夹
2. 安装git：`git init`，创建.gitignore文件
3. 安装npm：`npm init`，自动创建package.json文件
4. 安装webpack相关：`npm install --save-dev webpack` 和 `npm install --save-dev webpack-cli` 和 `npm install --save-dev webpack-dev-server` 和 `npm install --save-dev html-webpack-plugin` 和 `npm install --save-dev mini-css-extract-plugin`，创建webpack.config.js文件，package.json加入start命令（见文件）
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


# V2.0

> 引入一个基础组件（button）示例

# V3.0

> 引入echarts组件，包含折线图，柱状图，饼状图，地图，散点图

## 步骤

1. 安装echarts：`npm install echarts`
2. 安装classnames：`npm install classnames` 和 `install @types/classnames`
3. 安装sass：`npm install node-sass`
4. 安装css，sass的loader：`npm install css-loader` 和 `npm install sass-loader`
5. 安装node：`npm install @types/node`
6. 编辑tsconfig.json（见文件）
7. 编辑webpack.config.js（见文件）
8. 编写组件代码
9. 发布npm

## 心得

* 启动报错：TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead，在react类中，都需要引入import React from 'react'，而不能只单单在extends的类中引入;
* tsconfig.json配置说明：
    * declaration和outDir：会生成一系列的d.ts定义文件，发布到npm后，其他项目引入时不会报找不到模块
    * esModuleInterop：ts对 import * 和 import default两种导入方式用两个helpers __importStar and __importDefault做分别处理
        1. 默认开启allowSyntheticDefaultImports（那是肯定的，我们需要它来实现默认导入的功能）
        2. 命名空间导入不允许被调用或者构造,需要改成默认导入

    * resolveJsonModule：允许从 .json 中导入、导出其类型
    * allowSyntheticDefaultImports:允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
    * jsx：TypeScript具有三种JSX模式：preserve，react和react-native。 这些模式只在代码生成阶段起作用 - 类型检查并不受影响
        1. preserve模式下生成代码中会保留JSX以供后续的转换操作使用（比如：Babel）。 另外，输出文件会带有.jsx扩展名。 
        2. react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js。 
        3. react-native相当于preserve，它也保留了所有的JSX，但是输出文件的扩展名是.js

    * noImplicitAny：在表达式和声明上有隐含的any类型时是否报错。
* webpack.config.js配置说明：
   
    * libraryTarget：'umd'，这是一种可以将你的 library 能够在所有的模块定义下都可运行的方式（并且导出的完全不是模块）。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量
    * umdNamedDefine：true，在 UMD 库中使用命名的 AMD 模块
