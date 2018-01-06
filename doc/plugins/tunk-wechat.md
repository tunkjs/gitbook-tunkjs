## tunk-wechat


tunk-wechat使tunk支持微信小程序，负责定义视图层如何 **触发Action** 及如何 **将新状态注入到视图组件**。

微信小程序整体代码风格跟vue有几分相似，我们可以将小程序提供的js-wxml-wxss代码结构看作一个视图组件，tunk担当数据服务层，tunk与微信小程序完美合体！

tunk灵活的通信机制可以有效避开状态管理的性能问题，为了提高tunk与小程序协作能力，我们也做了有针对性的优化。譬如，隐藏的页面不会被注入新状态，提供onBeforeStateChange钩子控制如何setData

----

### 安装
````javascript
npm install tunk-wechat -S
````

### 引入
````javascript
import tunk from 'tunk'
import tunkWechat, {App} from 'tunk-wechat'
tunk.use([tunkWechat]);

// 引入放在modules文件夹下面的countdown模块
require('modules/countdown');

App({
  onLaunch: function () {}
}
````

### API

tunk-wechat内部封装了全局App、Page构建方法，同时提供同名的构建方法，使用方式也与小程序提供的App、Page一致

````javascript
import {App, Page} from 'tunk-wechat'
````

#### App 注册小程序
##### actions属性
支持actions属性的设置，注入action的代理方法

````javascript
App({
    actions:{
        myFunc: 'myModule.myAction'
    },
    onLaunch: function () {
        // 调用myModule模块的myAction代理方法
        this.myFunc();
    }
}
````
##### dispatch方法
支持使用dispatch调起模块的action

````javascript
App({
    onLaunch: function () {
        // 调起myModule模块的myAction
        this.dispatch('myModule.myAction', arg1, arg2...);
    }
}
````

#### Page 注册页面

Page支持**actions设置**和**dispatch方法**，下面不再说明

##### state设置
````javascript
Page({
    state: {
        cd: 'countdown.count'
    }
}
````

Page执行后，会给data对象添加相应的字段，如上例的：cd字段，Page onload前或状态变更后，会将'countdown.count'对应状态数据，通过`setData`注入到cd字段

状态变更不会注入到隐藏的Page，只会记录该Page有哪些订阅的状态发生变更，onShow之后将会从数据服务层获得已订阅的、已变更的最新状态

##### onBeforeStateChange
````javascript
Page({
    state: {
       cd: 'countdown.count'
    },
    onBeforeStateChange(newState){
    	return {cd: newState.cd}
    }
}
````

通过state设置订阅的状态变更，在setData前，会先触发 `onBeforeStateChange` 钩子，并传入新状态变更

用户可通过`onBeforeStateChange`控制新状态通过setData注入当前组件，`onBeforeStateChange`中`return`返回的对象将会代替newState执行setData注入到组件中

如用户未定义`onBeforeStateChange`或`onBeforeStateChange`未返回Object结果，将直接将新状态通过setData注入到组件

> 不建议把过多的逻辑放到onBeforeStateChange处理

##### dispatch
用于调起数据服务模块的action，可获得返回action内执行return的内容，支持Promise 

````javascript
Page({
    onLoad(){
    	this.dispatch('countdown.increase', arg1, arg2 ...);
    }
}
````

### 与tunk数据服务层通信总结

#### A. 两种方式触发模块的Action

1. 通过添加`actions`设置向视图组件注入Action代理方法，直接调用这些代理方法
2. 使用tunk-wechat提供的 `this.dispatch('moduleName.actionName', [arg1, arg2, ...])`

#### B. 两种方式获得Action处理结果

1. **被动注入**：通过给组件添加订阅状态属性`state`，设置要订阅的模块状态字段路径，该视图组件将会被动态注入相关的状态数据
2. **主动获取**：tunk-wechat为小程序App、Page提供的 `dispatch`方法，可获得action方法return的内容


----

[更多tunk实例](https://github.com/tunkjs/examples)

[github](https://github.com/tunkjs/tunk-wechat)
