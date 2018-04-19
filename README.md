

## init 项目

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

   ## webpack

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

   ## 命令脚本

   考虑到用 CLI 这种方式来运行本地的` webpack `不是特别方便，我们可以设置一个快捷方式。在 *package.json* 添加一个build脚本

   ```json
   "scripts":{
       "test": "echo \"Error: no test specified\" && exit 1",
       "build_dev": "webpack --mode development",
       "build_prod": "webpack --mode production"
     }
   ```

   现在我们可以使用`yarn build_dev`来编译项目。

   ## Babel

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

   ```json
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

   ```js
    /*使用es6的箭头函数*/
    var func = str => {
        document.getElementById('app').innerHTML = str;
    };
    func('我在测试Babel转译ES6!');
   ```

   执行`webpack`打包命令

   `yarn build_dev`

   浏览器打开`index.html`,可以看到正确的输出:`我在测试Babel转译ES6!`.

## react

1. 安装`react和react-dom`

   `yarn add react react-dom`

2. 修改`src/index.js`,使用`react`

   ```jsx
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

   ```jsx
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

   ```jsx
   import React from "react";
   import ReactDom from 'react-dom';
   import Hello from './components/Hello/Hello.js'

   ReactDom.render(
       <Hello />,document.getElementById('app')
   )
   ```

   执行`yarn build_dev`，打开`dist/index.html`查看。

## react-router

安装`react-router`

`yarn add react-router-dom`

新建`router`文件夹和组件

`cd src && mkdir router && touch router/router.js`

编辑`router.js`。参考[文档](http://reacttraining.cn/web/guides/quick-start)。

`src/router/router.js`

```jsx
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

```jsx
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

```jsx
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

```jsx
import React from "react";
import ReactDom from 'react-dom';
// import Hello from './components/Hello/Hello.js';
import GetRouter from './router/router.js';

ReactDom.render(
    <GetRouter />,document.getElementById('app')
)
```

打开`index.html`,如下

![1522238157414](C:\Users\vipga\AppData\Local\Temp\1522238157414.png)

但是点击 首页 和 关于 都没反应。因为我们之前是使用绝对路径去访问的`index.html`,类似上图。不是我们想象中的路由的路径`http://localhost:8040`。所以我们需要配置一个简单的WEB服务器来指向`index.html`.

有两种方法来实现

1、使用`Nginx`,`Apache`,`IIS`等配置启动

2、使用`webpack-dev-server`来配置

## webpack-dev-server

简单来说，`webpack-dev-server`就是一个小型的静态文件服务器。使用它，可以为`webpack`打包生成的资源文件提供Web服务。

首先安装

`yarn add webpack-dev-server --dev`

修改`webpack.config.js`,增加`webpack-dev-server`的配置

```json
devServer: {
        contentBase: path.join(__dirname, './dist')
}
```

现在可以执行命令

`webpack-dev-server ---config webpack.config.js`

此时，我们可以在`package.json`,添加一条script，

`"start": "webpack-dev-server ---config webpack.config.js"`

之后就可以直接使用`yarn start`指令来启动服务。

可以看到类似下面的信息，启动的服务默认端口是8080端口

![1522240148770](C:\Users\vipga\AppData\Local\Temp\1522240148770.png)

用浏览器访问`http://localhots:8080`，可以看到类似下面的，此时点击菜单，就可以到想去的页面啦~

![1522240340170](C:\Users\vipga\AppData\Local\Temp\1522240340170.png)![1522240352414](C:\Users\vipga\AppData\Local\Temp\1522240352414.png)

关于`webpack-dev-server`的详细介绍，可以参见  [链接1](https://segmentfault.com/a/1190000006670084) [链接2](https://segmentfault.com/a/1190000006964335)

`conten-base`是设定`webpack-dev-server`伺服的`directory`。如果不进行设定的话，默认是在当前目录下。告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。

更多关于`webpack-dev-server`的配置，可参见官网文档[devServer](https://doc.webpack-china.org/configuration/dev-server/).

然后对`webpack-dev-server`的配置进行修改:

```json
devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        historyApiFallback: true
    }
```

`"start": "webpack-dev-server ---config webpack.config.js --color --progress"`

**[注意]：你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件**

## 模块热替换（Hot Module Replacement）

到目前，当我们修改代码的时候，浏览器会自动刷新页面。

接下来我们要进行修改，使页面只会更新修改的那一部分，而不是整个页面。

1、首先在`package.json`中添加 `--hot`

```js
"start": "webpack-dev-server --config webpack.config.js --color --hot"
```

2、然后在`src/index.js`中进行修改。增加`module.hot.accept()`,如下。当模块更新的时候，通知`index.js`。

```jsx
import React from "react";
import ReactDom from 'react-dom';
// import Hello from './components/Hello/Hello.js';
import getRouter from './router/router';

if(module.hot){
    module.hot.accept();
}

ReactDom.render(
    getRouter(),document.getElementById('app')
)
```

现在我们进行修改home.js或者其他文件，可以发现在页面不刷新的情况下，页面内容发生了改变。

但是上面的配置对`react`模块的支持不是很好。

例如下面的`demo`，当模块热替换的时候，`state`会重置，这不是我们想要的。

修改`Home.js`,增加计数`state`

```jsx
import React, { Component } from "react";

export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick(){
        this.setState({
            count: ++this.state.count
        })
    }

    render(){
        const{
            count
        } = this.state;

        return(
            <div>
                首页欢迎你.~~~~<br/>
                当前计数：{count} <br/>
                <button onClick={() => this._handleClick()}> 加1s</button>
            </div>
        )
    }
}
```

你可以测试一下，当我们修改代码的时候，`webpack`在更新页面的时候，也把`count`初始为0了。

为了在`react`模块更新的同时，能保留`state`等页面中其他状态，我们需要引入[react-hot-loader](https://github.com/gaearon/react-hot-loader)~

Q:　请问`webpack-dev-server`与`react-hot-loader`两者的热替换有什么区别？

A: 区别在于`webpack-dev-serve`r自己的`--hot`模式只能即时刷新页面，但状态保存不住。因为`React`有一些自己语法(JSX)是`HotModuleReplacementPlugin`搞不定的。
而`react-hot-loader`在`--hot`基础上做了额外的处理，来保证状态可以存下来。（来自[segmentfault](https://segmentfault.com/q/1010000005612845)）

下面我们来加入`react-hot-loader `,

安装依赖

`yarn add react-hot-loader --dev`

根据[文档](https://gaearon.github.io/react-hot-loader/getstarted/)，我们要做如下几个修改~

1、首先要在`.babelrc`中进行添加 

```json
{
    "presets": [
        "es2015",
        "react",
        "stage-0"
    ],
    "plugins": [
        "react-hot-loader/babel"
    ]
}
```

2、在`webpack.config.js`中

```json
entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ],
```

3、在`src/index.js`中

```jsx
import React from "react";
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import Hello from './components/Hello/Hello.js';
import getRouter from './router/router';

const render = Component => {
    ReactDom.render(
        <AppContainer>
            {Component}
        </AppContainer>,
        document.getElementById('app')
    );
}

/**初始化 */
render(getRouter());

/**热更新 */
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const NextGetRouter = require('./router/router').default;
        render(NextGetRouter())
    });
}
```

4.修改`src/Home/Home.js`。 

其他模块如果需要，可以自己同理修改。

```jsx
import React, { Component } from "react";
import { hot } from 'react-hot-loader';

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick(){
        this.setState({
            count: ++this.state.count
        })
    }

    render(){
        const{
            count
        } = this.state;

        return(
            <div>
                首页欢迎你~~~<br/>
                当前计数：{this.state.count} <br/>
                <button onClick={() => this._handleClick()}> 加1s</button>
            </div>
        )
    }
}
export default hot(module)(Home);
```

可以执行`yarn start`,修改`src/Home/Home.js`，看下计数的变化。

## 文件路径优化

之前写的代码中，我们引用其他文件时，写的都是相对路径。

比如`src/router/router.js`中，

```js
import Home from '../containers/Home/Home.js';
import About from '../containers/About/About.js';
```

webpack提供了一个别名配置，就是我们无论在哪个路径下，引用都可以这样使用

```js
import Home from 'containers/Home/Home.js';
import About from 'containers/About/About.js';
```

同样，再`src/index.js`中修改

```js
import getRouter from 'router/router';
```

## redux

接下来，要在项目中集成`redux`.

要对`redux`有一个大概的认识，可以阅读阮一峰前辈的[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

如果要对`redux`有一个非常详细的认识，我推荐阅读[中文文档](http://cn.redux.js.org/index.html)，写的非常好。读了这个教程，有一个非常深刻的感觉，`redux`并没有任何魔法。

**不要被各种关于 reducers, middleware, store 的演讲所蒙蔽 ---- Redux 实际是非常简单的。**

当然，我这篇文章是写给新手的，如果看不懂上面的文章，或者不想看，没关系。先会用，多用用就知道原理了。

开始整代码！我们就做一个最简单的计数器。自增，自减，重置。

安装	`redux`

`yarn add redux --dev`

初始化目录结构

```
cd src && mkdir redux
cd redux && mkdir actions && mkdir reducers
touch reducers.js && touch store.js
touch actions/counter.js && touch reducers/counter.js
```

先来写`action`创建函数。**通过action创建函数，可以创建action~**
`src/redux/actions/counter.js`

```js
/**action */
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function increment(){
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function reset() {
    return {
        type: RESET
    }
}
```

再来写`reducer`,**reducer是一个纯函数，接收action和旧的state,生成新的state.**

`src/redux/reducers/counter.js`

```jsx
import { INCREMENT, DECREMENT, RESET } from '../actions/counter';

/**初始化state */
const initState ={
    count: 0
};

/**reducer */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return{
                count: state.count + 1
            };
            break;
        case DECREMENT:
            return {
                count: state.count - 1
            };
            break;
        case RESET:
            return {
                count: 0
            };
            break;
        default:
            return state
            break;
    }
}
```

一个项目有很多的`reducers`,我们要把他们整合到一起

`src/redux/reducers.js`

```js
import counter from './reducers/counter';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}
```

到这里，我们必须再理解下一句话。

**reducer就是纯函数，接收state 和 action，然后返回一个新的 state。**

看看上面的代码，无论是`combineReducers`函数也好，还是`reducer`函数也好，都是接收`state`和`action`，
返回更新后的`state`。区别就是`combineReducers`函数是处理整棵树，`reducer`函数是处理树的某一点。

接下来，我们要创建一个`store`。

前面我们可以使用 `action` 来描述“发生了什么”，使用`action`创建函数来返回`action`。

还可以使用 `reducers` 来根据 `action` 更新 `state` 。

那我们如何提交`action`？提交的时候，怎么才能触发`reducers`呢？

`store` 就是把它们联系到一起的对象。`store` 有以下职责：

- 维持应用的 `state`；
- 提供 `getState()` 方法获取 `state`；
- 提供 `dispatch(action)` 触发`reducers`方法更新 `state`；
- 通过`subscribe(listener)` 注册监听器;
- 通过 `subscribe(listener)` 返回的函数注销监听器。

`src/redux/store.js`

```js
import {createStore} from 'redux';
import combineReducers from './reducers.js';

let store = createStore(combineReducers);

export default store;
```

到现在为止，我们已经可以使用`redux`了~

下面我们就简单的测试下

```
cd src/redux
touch testRedux.js
```

`src/redux/testRedux.js`

```js
import { increment, decrement, reset } from "./actions/counter";
import store from './store';

/**打印初始状态 */
console.log(store.getState());

/**监听每次更新时，打印日志
 * subscribe() 会返回一个用来注销监听器的函数
 */
let unsubcribe = store.subscribe(() => console.log(store.getState()));

/**发起一系列 action */
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

/**停止监听state 更新 */
unsubcribe();
```

当前文件夹(即`src/redux`)执行命令

```
webpack testRedux.js --output build.js
node build.js
```

可以看到输出日志

```json
{ counter: { count: 0 } }
{ counter: { count: 1 } }
{ counter: { count: 0 } }
{ counter: { count: 0 } }
```

做这个测试，就是为了告诉大家，`redux`和`react`没关系。

到这里，我建议你再理下`redux`的数据流，看看[这里](http://cn.redux.js.org/docs/basics/DataFlow.html)。

1. 调用`store.dispatch(action)`提交`action`。
2. `redux store`调用传入的`reducer`函数。把当前的`state`和`action`传进去。
3. 根 `reducer` 应该把多个子 `reducer` 输出合并成一个单一的 `state` 树。
4. `Redux store` 保存了根 `reducer` 返回的完整 `state` 树。

同样在`webpack.config.js`文件中添加文件别名，

```json
resolve: {
        alias: {
            containers: path.join(__dirname, 'src/containers'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    }
```

把前面写的对应的相对路径都改改。

下面我们开始搭配`react`使用。

写一个`Counter`页面

```
cd containers && mkdir Counter && touch Counter/Counter.js
```

`src/containers/Counter/Counter.js`

```jsx
import React, {Component} from 'react';

export default class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为(显示redux计数)</div>
                <button onClick={() => {
                    console.log('调用自增函数');
                }}>自增
                </button>
                <button onClick={() => {
                    console.log('调用自减函数');
                }}>自减
                </button>
                <button onClick={() => {
                    console.log('调用重置函数');
                }}>重置
                </button>
            </div>
        )
    }
}
```

修改路由，增加`Counter`

`src/router/router.js`

```jsx
import React from 'react';
import {
    BrowserRouter as Router,
    Route,  Switch, Link
} from 'react-router-dom';
import Home from 'containers/Home/Home';
import About from 'containers/About/About';
import Counter from "containers/Counter/Counter";

const getRouter = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="">首 页</Link> </li>
                    <li><Link to="/conuter">计 数 器</Link></li>
                    <li><Link to="/about">关 于</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/conuter" component={Counter} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    )
}
export default getRouter;
```

`yarn start`看看效果。

下一步，我们让`Counter`组件和`Redux`联合起来。使`Counter`能获得到`Redux`的`state`，并且能执行`action`。

当然我们可以使用刚才测试`testRedux`的方法，手动监听~手动引入`store`~但是这肯定很麻烦哦。

`react-redux`提供了一个方法`connect`。

> 容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。

`connect`接收两个参数，一个`mapStateToProps`,就是把`redux`的`state`，转为组件的`Props`，还有一个参数是`mapDispatchToprops`,
就是把执行`actions`的方法，转为`Props`属性函数。

先安装`react-redux`

`yarn add react-redux`

`src/containers/Counter/Counter.js`

```jsx
import React, { Component } from "react";
import { increment, decrement, reset } from "actions/counter";

import { connect } from "react-redux";
class Counter extends Component{
    render(){
        //console.log(this.props);
        return (
            <div>
                <div>当前计数为({this.props.counter.count})</div>
                <button onClick={() => this.props.increment()}>自增
                </button>
                <button onClick={() => this.props.decrement()}>自减
                </button>
                <button onClick={() => this.props.reset()}>重置
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: ()=> {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset:() => {
            dispatch(reset())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

下面我们要传入`store`

> 所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。



> 建议的方式是使用指定的 React Redux 组件`Provider `来 魔法般的 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

`src/index.js`

```jsx
import React from "react";
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from "react-redux";
import store from './redux/store';
// import Hello from './components/Hello/Hello.js';
import getRouter from 'router/router';

const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {Component}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}

/**初始化 */
render(getRouter());

/**热更新 */
if (module.hot) {
    module.hot.accept('./router/router.js', () => {
        const NextGetRouter = require('./router/router').default;
        render(NextGetRouter())
    });
}
```

到这里我们就可以执行`yarn start`，打开localhost:8080/counter看效果了。

这里我们再缕下（可以读[React 实践心得：react-redux 之 connect 方法详解](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)）

1. `Provider`组件是让所有的组件可以访问到`store`。不用手动去传。也不用手动去监听。

2. `connect`函数作用是从 `Redux state` 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递`dispatch(action)`函数到`props`。

   react-redux 提供了两个重要的对象，`Provider` 和 `connect`，前者使 React 组件可被连接（connectable），后者把 React 组件和 Redux 的 store 真正连接起来。

接下来，我们要说异步`action`

参考地址： [http://cn.redux.js.org/docs/advanced/AsyncActions.html](http://cn.redux.js.org/docs/advanced/AsyncActions.html)

想象一下我们调用一个异步`get`请求去后台请求数据：

1. 请求开始的时候，界面转圈提示正在加载。`isLoading`置为`true`。
2. 请求成功，显示数据。`isLoading`置为`false`,`data`填充数据。
3. 请求失败，显示失败。`isLoading`置为`false`，显示错误信息。

下面，我们以向后台请求用户基本信息为例。

1.我们先创建一个`user.json`，等会请求用，相当于后台的API接口。

```
cd dist && mkdir api
cd api && touch user.json
```

`dist/api/user.json`

```json
{
    "name": "pompeygao",
    "intro": "I am a rookie"
}
```

2.创建必须的`action`创建函数。

```
cd src/redux/actions
touch userInfo.js
```

`src/redux/actions/userInfo.js`

```js
/**action */
export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";

function getUserInfoRequest() {
    return{
        type: GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess(userInfo) {
    return{
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

function getUserInfoSuccess() {
    return {
        type: GET_USER_INFO_FAIL
    }
}
```

我们创建了发起请求，请求成功，请求失败三个`action`创建函数。

3.创建`reducer`

再强调下，`reducer`是根据旧`state`和`action`生成新`state`的**纯函数**。

```
cd src/redux/reducers
touch userInfo.js
```

`src/redux/reducers/userInfo.js`

```jsx
import {GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL} from 'actions/userInfo';


const initState = {
    isLoading: false,
    userInfo: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                userInfo: {},
                errorMsg: ''
            };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.userInfo,
                errorMsg: ''
            };
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}
```

**这里的...state语法，是和别人的Object.assign()起同一个作用，合并新旧state。我们这里是没效果的，但是我建议都写上这个哦**

组合`reducer`

`src/redux/reducers.js`

```jsx
import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action),
        userInfo: userInfo(state.userInfo, action)
    }
}
```

4.现在有了`action`，有了`reducer`，我们就需要调用把`action`里面的三个`action`函数和网络请求结合起来。

- 请求中 `dispatch getUserInfoRequest`
- 请求成功 `dispatch getUserInfoSuccess`
- 请求失败 `dispatch getUserInfoFail`

`src/redux/actions/userInfo.js`增加

```jsx
export function getUserInfo() {
    return function (dispatch) {
        dispatch(getUserInfoRequest());

        return fetch('http://localhost:8080/api/user.json').then(response =>{
            return response.json()
        }).then(json => {
            dispatch(getUserInfoSuccess(json))
        }).catch(()=>{
            dispatch(getUserInfoFail())
        })
    }
}
```

我们这里发现，别的`action`创建函数都是返回`action`对象：

```
{type: xxxx}
```

但是我们现在的这个`action`创建函数 `getUserInfo`则是返回函数了。

为了让`action`创建函数除了返回`action`对象外，还可以返回函数，我们需要引用`redux-thunk`。

`yarn add redux-thunk`

这里涉及到`redux`中间件`middleware`，后面会讲到的。你也可以读这里[Middleware](http://cn.redux.js.org/docs/advanced/Middleware.html)。

简单的说，中间件就是`action`在到达`reducer`，先经过中间件处理。我们之前知道`reducer`能处理的`action`只有这样的`{type:xxx}`，所以我们使用中间件来处理函数形式的`action`，把他们转为标准的`action`给`reducer`。这是`redux-thunk`的作用。
使用`redux-thunk`中间件，我们来引入`redux-thunk`中间件

```jsx
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import combineReducers from "./reducers.js";

let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

export default store;
```

到这里，`redux`这边OK了，我们来写个组件验证下。

```
cd src/containers && mkdir UserInfo
touch UserInfo/UserInfo.js
```

`src/pages/UserInfo/UserInfo.js`

```jsx
 import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "actions/userInfo";

class UserInfo extends Component {
    render() {
        const { userInfo: { isLoading, userInfo, errorMsg }, getUserInfo } = this.props;
        return (
            <div>
                {
                    isLoading
                        ? "信息获取中..."
                        : (errorMsg
                            ? errorMsg
                            : <div>
                                <p>用户信息</p>
                                <p>用户名：{userInfo.name}</p>
                                <p>用户简介：{userInfo.intro}</p>
                            </div>)
                }
                <button onClick={() => getUserInfo()}>获取用户信息</button>
            </div>
        )
    }
}
export default connect(state => ({ userInfo: state.userInfo }), { getUserInfo })(UserInfo);
```

这里你可能发现`connect`参数写法不一样了，`mapStateToProps`函数用了`es6`简写，`mapDispatchToProps`用了`react-redux`提供的简单写法。

增加路由
`src/router/router.js`

```jsx
import React from 'react';
import { BrowserRouter, Route,  Switch, Link } from 'react-router-dom';
import Home from 'containers/Home/Home';
import About from 'containers/About/About';
import Counter from "containers/Counter/Counter";
import UserInfo from "containers/UserInfo/UserInfo";

const getRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="">首 页</Link> </li>
                    <li><Link to="/userinfo">用户信息</Link></li>
                    <li><Link to="/conuter">计 数 器</Link></li>
                    <li><Link to="/about">关 于</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/userinfo" component={UserInfo} />
                    <Route path="/conuter" component={Counter} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default getRouter;
```

现在可以执行`yarn start`去看效果啦！

到这里`redux`集成基本告一段落了，后面我们还会有一些优化。

## combinReducers优化

`redux`提供了一个`combineReducers`函数来合并`reducer`，不用我们自己合并哦。写起来简单，但是意思和我们
自己写的`combinReducers`也是一样的。

`src/redux/reducers.js`

```jsx
import {combineReducers} from "redux";
import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';

export default combineReducers({
    counter,
    userInfo
});
```

## devtool优化

现在我们发现一个问题，如果代码写错了，浏览器报错只报在`build.js`的第几行。

这让我们分析错误无从下手。看[这里](https://doc.webpack-china.org/configuration/devtool)。

这次看到的错误信息就会提示的很详细。

## 编译css

`css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能；

`style-loader`将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入`webpack`打包后的JS文件中。

安装 ` css-loader` 和 `style-loader`

`yarn add css-loader style-loader --dev`

在`webpack.config.js` `rules`增加

```json
{
   test: /\.css$/,
   use: ['style-loader', 'css-loader']
}
```

我们用`About`页面来测试下

```
cd src/containers/About
touch About.css
```

`src/containers/About/About.css`

```css
.font-box{
    border: 1px solid red;
}
```

`src/containers/About/About.js`

```jsx
import React, { Component } from "react";
import './About.css'

export default class About extends Component{
    render(){
        return(
            <div className="font-box">
                这是About页面-
            </div>
        )
    }
}
```

可以`yarn start`看到关于页面的样式。

## 编译图片

安装`url-loader file-load`

`yarn add url-loader file-loader --dev`

`webpack.config.js` `rules`增加

```js
{
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192
        }
    }]
}
```

`options limit 8192`意思是，小于等于8K的图片会被转成`base64`编码，直接插入HTML中，减少`HTTP`请求。

我们来用关于页面测试下

```
cd src/containers/About
mkdir images
```

给`images`文件夹放一个图片。

修改代码，引用图片.

`src/containers/About/About.js`

```jsx
import React, { Component } from "react";
import './About.css';
import image from "./images/qgwl.gif";

export default class About extends Component{
    render(){
        return(
            <div className="font-box">
                这是About页面
            	<img src={image} />
            </div>
        )
    }
}
```

`yarn start `打开关于页面，可以看到图片已经加载。

## 按需加载

为什么要实现按需加载？

我们现在看到，打包完后，所有页面只生成了一个`build.js`,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的`js`了哦。

如果每个页面都打包了自己单独的JS，在进入自己页面的时候才加载对应的js，那首屏加载就会快很多哦。

在 `react-router 2.0`时代， 按需加载需要用到的最关键的一个函数，就是`require.ensure()`，它是按需加载能够实现的核心。

在4.0版本，官方放弃了这种处理按需加载的方式，选择了一个更加简洁的处理方式。

[传送门](https://reacttraining.com/react-router/web/guides/code-splitting)

根据官方示例，我们开搞

`yarn add bundle-loader --dev`

新建`bundle.js`

```
cd src/router
touch bundle.js
```

`src/router/Bundle.js`

```jsx
import react, { Component } from "react";

class Bundle extends Component {
    state = {
         // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    componentWillMount(){
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.load !== this.props.load){
            this.load(nextProps);
        }
    }

    load(props){
        this.setState({
            mod: null
        });

        props.load(mod => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        })
    }

    render(){
        return this.props.children(this.state.mod)
    }

}
export default Bundle;
```

改造路由器

`src/router/router.js`

```jsx
import React from 'react';
import { BrowserRouter, Route,  Switch, Link } from 'react-router-dom';

import Bundle from "./bundle";
import Home from 'bundle-loader?lazy&name=home!containers/Home/Home';
import About from 'bundle-loader?lazy&name=about!containers/About/About';
import Counter from "bundle-loader?lazy&name=counter!containers/Counter/Counter";
import UserInfo from "bundle-loader?lazy&name=userInfo!containers/UserInfo/UserInfo";

const Loading = () => {
    return <div>加载中...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);

const getRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="">首 页</Link> </li>
                    <li><Link to="/userinfo">用户信息</Link></li>
                    <li><Link to="/conuter">计 数 器</Link></li>
                    <li><Link to="/about">关 于</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={createComponent(Home)} />
                    <Route path="/userinfo" component={createComponent(UserInfo)} />
                    <Route path="/conuter" component={createComponent(Counter)} />
                    <Route path="/about" component={createComponent(About)} />
                </Switch>
            </div>
        </BrowserRouter>
    )
};
export default getRouter;
```

现在你可以`yarn start`，打开浏览器，看是不是进入新的页面，都会加载自己的js的~

但是你可能发现，名字都是`0.bundle.js`这样子的，这分不清楚是哪个页面的`js`呀！

我们修改下`webpack.config.js`,加个`chunkFilename`。`chunkFilename`是除了`entry`定义的入口`js`之外的`js`~

```js
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        chunkFilename: '[name].js'
    }
```

现在你运行发现名字变成`home.js`,这样的了。棒棒哒！

那么问题来了`home`是在哪里设置的？`webpack`怎么知道他叫`home`？

其实在这里我们定义了，`router.js`里面

`import Home from 'bundle-loader?lazy&name=home!containers/Home/Home';`

看到没。这里有个`name=home`。

参考地址：

1. [http://www.jianshu.com/p/8dd98a7028e0](http://www.jianshu.com/p/8dd98a7028e0)
2. [https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)
3. [https://segmentfault.com/a/1190000007949841](https://segmentfault.com/a/1190000007949841)
4. [http://react-china.org/t/webpack-react-router/10123](http://react-china.org/t/webpack-react-router/10123)
5. [https://juejin.im/post/58f9717e44d9040069d06cd6](https://juejin.im/post/58f9717e44d9040069d06cd6)

## 缓存

想象一下这个场景~

我们网站上线了，用户第一次访问首页，下载了`home.js`，第二次访问又下载了`home.js`~

这肯定不行呀，所以我们一般都会做一个缓存，用户下载一次`home.js`后，第二次就不下载了。

有一天，我们更新了`home.js`，但是用户不知道呀，用户还是使用本地旧的`home.js`。出问题了~

怎么解决？每次代码更新后，打包生成的名字不一样。比如第一次叫`home.a.js`，第二次叫`home.b.js`。

文档[看这里](https://doc.webpack-china.org/guides/caching)

我们照着文档来

`webpack.config.js`

```js
output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }
```

每次打包都给文件名添加个hash值，

现在我们试试，是不是修改了文件，打包后相应的文件名字就变啦？

但是你可能发现了，网页打开报错了~因为你`dist/index.html`里面引用`js`名字还是`bundle.js`老名字啊,改成新的名字就可以啦。

啊~那岂不是我每次编译打包，都得去改一下js名字？欲知后事如何，且看下节分享。

## HtmlWebpackPlugin

这个插件作用就是，每次会自动把js插入到你的模板`index.html`里面去。

`yarn add html-webpack-plugin --dev`

新建模板`index.html`

```
cd src
touch index.html
```

`src/index.html`

```html
<!Doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>react learning</title>
  </head>
  <body>
  	<div id="app"></div>
  </body>
</html>
```

修改`webpack.config.js`，增加`plugin`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  ......,
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
    })]
}
```

`yarn start`运行项目，看看是不是能正常访问啦。~

说明一下：`yarn start`打包后的文件存在内存中，是看不到的。~ 你可以把遗留`dist/index.html`删除掉了。

## 提取公共代码

想象一下，我们的主文件，原来的`bundle.js`里面是不是包含了`react`,`redux`,`react-router`等等
这些代码？？这些代码基本上不会改变的。但是，他们合并在`bundle.js`里面，每次项目发布，重新请求`bundle.js`的时候，相当于重新请求了`react`等这些公共库。

我们把`react`这些不会改变的公共库提取出来，用户缓存下来。从此以后，用户再也不用下载这些库了，无论是否发布项目。

`webpack`文档给了教程，[看这里](https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-)。

修改`webpack.config.js`

```js
const webpack = require('webpack');
module.exports = {
  entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
   },
  plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: 10,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        })
    ]
}
```

把`react`等库生成打包到`vendor.hash.js`里面去。

但是你现在可能发现编译生成的文件`app.[hash].js`和`vendor.[hash].js`生成的`hash`一样的，这里是个问题，因为呀，你每次修改代码,都会导致`vendor.[hash].js`名字改变，那我们提取出来的意义也就没了。其实文档上写的很清楚，

```js
   output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js', //这里应该用chunkhash替换hash
        chunkFilename: '[name].[chunkhash].js'
    }
```

但是无奈，如果用`chunkhash`，会报错。和`webpack-dev-server --hot`不兼容，具体[看这里](https://github.com/webpack/webpack-dev-server/issues/377)。

现在我们在配置开发版配置文件，就向`webpack-dev-server`妥协，因为我们要用他。问题先放这里，等会我们配置正式版`webpack.prod.js`的时候要解决这个问题。

参考文章：

[记一次webpack3升级webpack4的踩坑](https://www.cnblogs.com/carrotWu/p/8665720.html)

[webpack/webpack](https://github.com/webpack/webpack/blob/master/examples/common-chunk-and-vendor-chunk/webpack.config.js)

## 生产环境构建

> 开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

文档[看这里](https://doc.webpack-china.org/guides/production)

新增`webpack.prod.js`

`touch webpack.prod.js`

在`webpack.config.js`的基础上先做以下几个修改~

1. 先删除`webpack-dev-server`相关的东西~
2. `devtool`的值改成`cheap-module-source-map`
3. 刚才说的`hash`改成`chunkhash`

`webpack.prod.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        alias: {
            containers: path.join(__dirname, 'src/containers'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    },
    /*src文件夹下面的以.js||.jsx结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
            options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        })
    ]
};
```

在`package.json`增加打包脚本

`"build":"webpack --config webpack.config.js"`

然后执行`yarn build`~看看`dist`文件夹是不是生成了我们发布要用的所有文件.

接下来我们还是要优化正式版配置文件。

## 文件压缩

`webpack`使用`UglifyJSPlugin`来压缩生成的文件。

`yarn add uglifyjs-webpack-plugin`

`webpack.prod.js`

```js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
......
plugins: [
    new UglifyJSPlugin({
  	    sourceMap: true
    })
]
```

`yarn build`进行打包。

## 指定环境

> 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：

`webpack.prod.js`

```js
module.exports = {
...
  plugins: [
  ...
       new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
           }
       })
  ]
}
```

# public path

想象一个场景，我们的静态文件放在了单独的静态服务器上去了，那我们打包的时候，如何让静态文件的链接定位到静态服务器呢？

看文档[Public Path](https://doc.webpack-china.org/guides/public-path) ，webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径。它被称为`公共路径(publicPath)`。

`webpack.prod.js` `output` 中增加一个`publicPath`，我们当前用`/`，相对于当前路径，如果你要改成别的`url`，就改这里就好了。

```
    output: {
        publicPath : '/'
    }
```

## 打包优化

你现在打开`dist`，是不是发现好多好多文件，每次打包后的文件在这里混合了？我们希望每次打包前自动清理下`dist`文件。

`yarn add clean-webpack-plugin --dev`

`webpack.prod.js`

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

plugins: [
    new CleanWebpackPlugin(['dist'])
]
```

现在`yarn build`试试，是不是之前的都清空了。当然我们之前的`api`文件夹也被清空了，不过没关系哦~本来就是测试用的。

# 抽取css

目前我们的`css`是直接打包进`js`里面的，我们希望能单独生成`css`文件。

我们使用[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)来实现。[ExtractTextWebpackPlugin](https://doc.webpack-china.org/plugins/extract-text-webpack-plugin)

`yarn add extract-text-webpack-plugin@next --dev` 

`webpack.prod.js`

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
     new ExtractTextPlugin({
          filename: "[name].[contenthash].css",
          disable: false,
          allChunks: true
      })
  ]
}
```

`yarn build`后发现单独生成了`css`文件哦.

## 使用`axios`和`middleware`优化API请求





## 合并提取`webpack`公共配置

想象一个场景，现在我想给`webpack`增加一个`css modules`依赖，你会发现，WTF?我即要修改`webpack.config.js`，又要修改`webpack.prod.js`~

这肯定不行啊。所以我们要把公共的配置文件提取出来。提取到`webpack.common.js`里面~

`webpack.config.js`和`webpack.prod.js`写自己的特殊的配置。

这里我们需要用到[webpack-merge](https://github.com/survivejs/webpack-merge)来合并公共配置和单独的配置。

这样说一下，应该看代码就能看懂了。下次公共配置直接就写在`webpack.common.js`里面啦。

> 这里偷偷说下，我修改了`CleanWebpackPlugin`的参数，不让他每次构建都删除`api`文件夹了。要不每次都得复制进去。麻烦~

`yarn add webpack-merge --dev`

`touch webpack.common.js`

`webpack.common.js`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        /*src文件夹下面的以.js||.jsx结尾的文件，要使用babel解析*/
        /*cacheDirectory是用来缓存编译结果，下次编译加速*/
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpe?g|gif)$/,
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash].[ext]'
                }
            }
            ]
        }]
    },
    resolve: {
        alias: {
            containers: path.join(__dirname, 'src/containers'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                }
            }
        })
    ]
}
```

`webpack.config.js`

```js
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: "development",
    entry: {
        app: [
            'react-hot-loader/patch'
        ]
    },
    output: {
        filename: '[name].[hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        historyApiFallback: true,
        hot: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
```

`webpack.prod.js`

```js
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            include: path.join(__dirname, 'src'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader'
                ]
            })
        }]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(['dist/*.*']),
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            allChunks: true
        })
    ]
});
```

## 加入 babel-plugin-transform-runtime 和 babel-polyfill

先来说说[babel-plugin-transform-runtime](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime)

> 在转换 ES2015 语法为 ECMAScript 5 的语法时，babel 会需要一些辅助函数，例如 _extend。babel 默认会将这些辅助函数内联到每一个 js 文件里，这样文件多的时候，项目就会很大。


> 所以 babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小。

`yarn add babel-plugin-transform-runtime --dev`

修改`.babelrc`配置文件,增加配置

.babelrc

```js
 "plugins": [
   ["transform-runtime",{
        "helpers": false,
        "polyfill": false,
        "regenerator": true
   }]
 ]
```

再来看[babel-polyfill](https://babeljs.io/docs/usage/polyfill/)

Q: 为什么要集成`babel-polyfill`?

A:

> Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
> 举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

网上很多人说，集成了`transform-runtime`就不用`babel-polyfill`了，其实不然，看看官方怎么说的：

> NOTE: Instance methods such as "foobar".includes("foo") will not work since that would require modification of existing built-ins (Use babel-polyfill for that).

所以，我们还是需要`babel-polyfill`哦。

`yarn add babel-polyfill --dev`

修改webpack配置文件。

`webpack.common.js`

```js
     app: [
         "babel-polyfill",
         path.join(__dirname, 'src/index.js')
     ]
```

## 集成PostCSS

[官方文档看这里](https://github.com/postcss/postcss)

Q: 这是啥？为什么要用它？

他有很多很多的插件，我们举几个例子~

[Autoprefixer](https://github.com/postcss/autoprefixer)这个插件,可以自动给css属性加浏览器前缀。

```css
/*编译前*/
.container{
    display: flex;
}
/*编译后*/
.container{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
```

 安装`postcss-loader`

```
yarn add postcss-loader --dev
```

修改`webpack`配置文件,增加`postcss-loader`

webpack.config.js

```js
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
        }]
```

webpack.prod.js

```js
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader"]
            })
        }]
```

根目录增加`postcss`配置文件。

```
touch postcss.config.js
```

`postcss.config.js`

```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

现在你运行代码，然后写个css，去浏览器审查元素，看看，属性是不是生成了浏览器前缀？

## 优化目录结构并增加404页面

现在我们优化下目录结构，把`router`和`nav`分开，新建根组件`App`。

新建`componments/Nav/Nav.js`

新建根组件`src/App/app.js`

编辑`app.js`

```jsx
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Nav from 'components/Nav/Nav';
import Bundle from "router/bundle";
import store from '../redux/store';
import Home from 'bundle-loader?lazy&name=home!containers/Home/Home';
import About from 'bundle-loader?lazy&name=about!containers/About/About';
import Counter from "bundle-loader?lazy&name=counter!containers/Counter/Counter";
import UserInfo from "bundle-loader?lazy&name=userInfo!containers/UserInfo/UserInfo";

const Loading = () => {
    return <div>加载中...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading {...props} />
        }
    </Bundle>
);

export default class App extends Component {
    render(){
        return (
            <AppContainer>
                <Provider store={store}>
                    <BrowserRouter>
                        <div>
                            {Nav()}
                            <Switch>
                                <Route exact path="/" component={createComponent(Home)} />
                                <Route path="/userinfo" component={createComponent(UserInfo)} />
                                <Route path="/conuter" component={createComponent(Counter)} />
                                <Route path="/about" component={createComponent(About)} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </AppContainer>
        )
    }
}
```

`src/components/Nav`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () =>{
    return (
        <ul>
            <li><Link to="">首  页</Link></li>
            <li><Link to="/userinfo">用户信息</Link></li>
            <li><Link to="/conuter">计 数 器</Link></li>
            <li><Link to="/about">关 于</Link></li>
        </ul>
    )
};
export default Nav;
```

`src/index.js`

```jsx
import React from "react";
import ReactDom from 'react-dom';
import App from './App/app';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
    const NEXT = require('./App/app').default;
    ReactDom.render(<NEXT />, MOUNT_NODE)
}
/**热更新 */
if (module.hot) {
    module.hot.accept('./App/app', () =>
        setImmediate(() => {
            ReactDom.unmountComponentAtNode(MOUNT_NODE);
            render();
        })
    );
}
render();
```

新建`containers/NotFound/404.js`

```jsx
import React, { Component } from "react";

export default class NotFound extends Component {

    render(){
        return (
            <div>
                啊偶，页面找不到了...
        </div>
        )
    }
}
```

修改`src/App/app.js`

```jsx
import NotFound from "bundle-loader?lazy&name=notFound!containers/NotFound/404";

<Route component={createComponent(NotFound)} />
```

## 使用CSS Modules

关于什么是`CSS Modules`，我这里不介绍。

可以去看阮一峰的文章[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

修改以下几个地方：

1. `webpack.config.js`

   ```js
   module: {
           rules: [{
               test: /\.css$/,
               use: ["style-loader", "css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
           }]
       }
   ```

2. `webpack.prod.js`

   ```js
   module: {
       rules: [{
           test: /\.css$/,
           use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use: ["css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
           })
       }]
   }
   ```

3. `src/pages/Page1/page1.css`

   ```css
   .font_box {
       border: 1px solid red;
   }
   ```

4. `src/containers/About/About.js`

   ```jsx
   import React, { Component } from "react";
   import style from './About.css';
   import image from "./images/qgwl.gif";

   export default class About extends Component{
       render(){
           return(
               <div className={style.font_box}>
                   这是About页面
                   <img src={image} />
               </div>
           )
       }
   }
   ```

这样就可以了。