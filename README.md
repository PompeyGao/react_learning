

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

#### webpack-dev-server

简单来说，`webpack-dev-server`就是一个小型的静态文件服务器。使用它，可以为`webpack`打包生成的资源文件提供Web服务。

首先安装

`yarn add webpack-dev-server --dev`

修改`webpack.config.js`,增加`webpack-dev-server`的配置

```js
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

```js
devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        historyApiFallback: true
    }
```

`"start": "webpack-dev-server ---config webpack.config.js --color --progress"`

**[注意]：你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件**

#### 模块热替换（Hot Module Replacement）

到目前，当我们修改代码的时候，浏览器会自动刷新页面。

接下来我们要进行修改，使页面只会更新修改的那一部分，而不是整个页面。

1、首先在`package.json`中添加 `--hot`

```js
"start": "webpack-dev-server --config webpack.config.js --color --hot"
```

2、然后在`src/index.js`中进行修改。增加`module.hot.accept()`,如下。当模块更新的时候，通知`index.js`。

```react
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

```react
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

```react
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

目前仍然有点问题，待解决...



#### 文件路径优化

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

#### redux

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
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            redux: path.join(__dirname, 'src/redux'),
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

未完待续....

#### 



