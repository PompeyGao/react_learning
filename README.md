

#### init 项目

1. 创建并进入项目文件夹

   `mkdir react_learnig && cd react_learning`

2. 初始化项目(本项目使用yarn)

   `yarn init`

   这将打开一个用于创建Yarn项目的交互式表单，其中包含以下问题：

   `question name (react_learning):`

   `question version (0.0.1):`

   `question description (learning react):`

   `question entry point (./src/index.js):`

   `question repository url:`

   `question author (pompeygao):`

   `question license (MIT):`

   `question private:`

   你可以回答这些问题，也可以直接一路回车使用默认配置或者留空。

   #### webpack

   1. 安装webpack(这里安装的是最新的webpack版本4.1.1),

      `yarn add webpack --dev`，

      > 用 `--dev` 或 `-D` 会在 `devDependencies`里安装一个或多个包

      然后全局安装一下

      `yarn global add webpack`

      webpack4.0之后 命令行单独分出一个包，webpack-cli,所以还要安装webpack-cli包

      `yarn global add webpack-cli`

   2. 创建入口文件

      `mkdir src && touch ./src/index.js `

      打开index.js文件添加内容

      ``document.getElementById('app').innerHTML = "Hello Webpack"`

   3. 根据[`webpack`](https://doc.webpack-china.org/guides/getting-started)的指导文档创建webpack开发配置文件

      此处创建的webpack配置文件在项目的根目录下

      `touch webpack.config.js`

      > `webpack4`支持零配置体验：在官网给出的示例中，可以不用配置`entry`和`output`，默认的`entry:'/src'`, 默认的`output:'./dist'`，但是零配置的情况下`'./src'`的入口文件的文件名必须是`index.js`，否则会报错

      打开 webpack.config.js文件，添加内容

      ```js
      const path = require('path');

      module.exports = {
        /**入口 */
        entry: './src/index.js',
        /**输出到dist文件夹，输出文件名字为bundle.js */
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };
      ```

   4. webpack编译文件，执行命令

      `webpack --config webpack.config.js`

      会出现类似下面的结果，说明构建成功。

      ```
      $ webpack --config webpack.config.js
      Hash: 628556889eda54a6f26a
      Version: webpack 4.1.1
      Time: 185ms
      Built at: 2018-3-13 11:16:37
          Asset       Size  Chunks             Chunk Names
      bundle.js  601 bytes       0  [emitted]  main
      Entrypoint main = bundle.js
         [0] ./src/index.js 58 bytes {0} [built]
       
      WARNING in configuration
      The 'mode' option has not been set. Set 'mode' option to 'development' or 'production' to enable defaults for this environment.
      ```

      > 看以下信息时，建议先看***命令脚本***小节。^_^
      >
      > 返回的信息最下面有warning信息，这也是`webpack4`的新特性：约定了生产模式和开发模式下的配置。
      >
      > 在之前的版本中，针对生产环境和开发环境，需要做不同的配置，常见的都是指定标量，然后在webpack.config.js配置文件中，进行环境判别，比如：
      >
      > ```js
      > "scripts":{
      >    "prod":"NODE_ENV=production webpack -p"
      > }
      > ```
      >
      > 判别出环境后，再在配置文件中，根据不同的环境做不同的打包工作。 
      > 或者是生成两个配置文件，webpack.dev.config.js和webpack.prod.config.js，分别对应于两个环境。
      >
      > 在`webpack4`中，提供了`mode`变量，用于配置运行环境，`mode`的值可以为`development`，表示的是开发模式，或者是`production`，表示的是生产模式。比如：
      >
      > ```js
      > "scripts":{
      >   "build":"webpack --mode production"
      > }
      > ```

   5. 查看编译结果

      在dist文件夹下新建index.html

      ` cd dist && touch index.html`

      编辑index.html 添加内容

      ```html
      <!doctype html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Getting Started</title>
      </head>
      <body>
      	<div id="app"></div>
      	<script src="./bundle.js" charset="utf-8"></script>
      </body>
      </html>
      ```

      用浏览器打开index.html，可以看到Hello Webpack.

   #### 命令脚本

   考虑到用 CLI 这种方式来运行本地的` webpack `不是特别方便，我们可以设置一个快捷方式。在 *package.json* 添加一个build脚本

   ```json
   "scripts":{
       "test": "echo \"Error: no test specified\" && exit 1",
       "build_dev": "webpack --mode development",
       "build_prod": "webpack --mode production"
     }
   ```

   现在我们可以使用`yarn build_dev`来编译项目。

   #### Babel

   > ​	                                                                                                                                                                                     Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译。
   >
   > 通俗的说，就是我们可以用ES6, ES7等来编写代码，Babel会把他们统统转为ES5。

   ​                                                                                                                                                                                              [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) 调用Babel的API进行转码

   [babel-loader](https://github.com/babel/babel-loader)

   [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015) ES2015转码规则，用于解析 ES6

   [babel-preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react) react转码规则，用于解析 JSX

   [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0) 用于解析 ES7 提案

   ​

   添加这些库，

   `yarn add babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 --dev`

   ​

   新建`babel`配置文件`.babelrc`(该文件用来设置转码规则和插件)

   `touch .babelrc`

   打开.babelrc 添加内容（具体可以查看[阮一峰的Bable入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)）

   ```json
    {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
   ```

   修改`webpack.config.js`,增加`babel-loader`

   ```js
   	/*src文件夹下面的以.js或.jsx结尾的文件，要使用babel解析*/
       /*cacheDirectory是用来缓存编译结果，下次编译加速*/
       module: {
           rules: [{
               test: /\.(js|jsx)$/,
               //use: ['babel-loader?cacheDirectory=true'],
               include: path.join(__dirname, 'src'),
               loader: require.resolve('babel-loader'),
               options: {
                   // This is a feature of `babel-loader` for webpack (not Babel itself).
                   // It enables caching results in ./node_modules/.cache/babel-loader/
                   // directory for faster rebuilds.
                   cacheDirectory: true,
               }
           }]
       }
   ```

   修改`src/inde.js`

   ```
    /*使用es6的箭头函数*/
    var func = str => {
        document.getElementById('app').innerHTML = str;
    };
    func('我在测试Babel转译ES6!');
   ```

   执行`webpack`打包命令

   `yarn build_dev`

   浏览器打开`index.html`,可以看到正确的输出:`我在测试Babel转译ES6!`.

#### react

1. 安装`react和react-dom`

   `yarn add react react-dom`

2. 修改`src/index.js`,使用`react`

   ```react
   import React from 'react';
   import ReactDom from 'react-dom';

   ReactDom.render(
       <div>Hello React!</div>, document.getElementById('app')
   );
   ```

   执行`yarn build_dev`,打开`index.html`.可以看到`Hello React!`.

3. 将`Hello React `放到组件中。

   ```
   $ cd src && mkdir components && cd components
   $ mkdir Hello && cd Hello && touch Hello.js
   ```

   打开`Hello.js`,

   ```react
   import React, { Component } from "react";

   export default class Hello extends Component{
       render(){
           return (
               <div>
                   Hello React Component!
               </div>
           )
       }
   }
   ```

   修改`src/index.js`

   ```react
   import React from "react";
   import ReactDom from 'react-dom';
   import Hello from './components/Hello/Hello.js'

   ReactDom.render(
       <Hello />,document.getElementById('app')
   )
   ```

   执行`yarn build_dev`，打开`dist/index.html`查看。

#### react-router

安装`react-router`

`yarn add react-router-dom`

新建`router`文件夹和组件

`cd src && mkdir router && touch router/router.js`

编辑`router.js`。参考[文档](http://reacttraining.cn/web/guides/quick-start)。

`src/router/router.js`

```react
import React from 'react';
import {
    BrowserRouter as Router,
    Route,  Switch, Link
} from 'react-router-dom';
import Home from '../containers/Home/Home.js';
import About from '../containers/About/About.js';

const getRouter = () => {
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="">首页</Link>
                </li>
                <li>
                    <Link to="/about">关于</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </Switch>
        </div>
    </Router>
}
export default getRouter;
```

新建`containers`文件夹和`containers/Home`、`containers/About`文件夹

` cd src && mkdir containers&& cd containers&& mkdir Home && mkdir About`

创建`Home/Home.js , About/About.js`

`touch Home/Home.js & touch About/About.js`

*Home.js*

```react
import React, { Component } from "react";

export default class Home extends Component{
    render(){
        return(
            <div>
                首页欢迎你~~~~
            </div>
        )
    }
}
```

*About.js*

```react
import React, { Component } from "react";

export default class Home extends Component{
    render(){
        return(
            <div>
                这是About页面
            </div>
        )
    }
}
```

现在路由和页面建好了，我们需要在入口文件`src/index.js`引用Router。

*src/index.js*

```react
import React from "react";
import ReactDom from 'react-dom';
// import Hello from './components/Hello/Hello.js';
import getRouter from './router/router.js';

ReactDom.render(
    <getRouter />,document.getElementById('app')
)
```



#### webpack-dev-server



#### HMR()





