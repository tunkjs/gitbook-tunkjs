
<div style="text-align:center; margin-bottom:50px;">
<img style="width: 200px;" src="./img/logo1x.png?raw=true" alt="tunk logo">
</div>


#### tunkjs基于传统数据流的基础上定义了逻辑分层解耦及灵活通信的模式，是一个具有状态管理功能的前端数据服务框架。 

tunkjs使前端业务逻辑划分为数据处理逻辑与交互处理逻辑，这两种逻辑分别构成**数据服务层**及**视图层**，数据服务层的状态数据统一存储在一个Store的状态树，视图组件面向数据服务层进行通信。

tunk除了实现了**传统的数据流**，也提供了**基于action但绕过Store**的传输方式，可满足不适用状态管理或性能要求较高的场景。

tunk通过**限制数据服务模块对状态树的更新范围**来避免状态变更的失控，合理抽象数据服务模块便无需向Store描述状态变更也可保证状态变更是可预测的。

tunk力图简化它的API及编码细节，使框架自身存在感更低、编码方式更自然，让使用者更专注于业务的实现，此外，用于绑定不同视图框架的组件（tunk-vue/tunk-react/tunk-wechat）API几乎一致，让你无需花太多时间掌握不同绑定组件的使用.

----

<!-- toc -->

### 安装

安装tunkjs核心，压缩后不超过7kb

````javascript
npm install tunk -S
````
除了tunk一般你还需要安装**视图框架绑定组件**

##### 搭配vue

````javascript
npm install tunk-vue -S
````
##### 搭配react或react native

````javascript
npm install tunk-react -S
````
##### 搭配微信小程序

````javascript
npm install tunk-wechat -S
````

----

### 相关文档

* [初衷](doc/intro/初衷.md)
* [必要特性](doc/intro/必要特性.md)
* [Welcome](doc/intro/welcome.md)
* [20分钟快速上手](doc/intro/20分钟快速上手.md)

### 基础

* [基本概念](doc/base/基本概念.md)
* [数据流](doc/base/数据流.md)
* [tunk API](doc/base/tunk-api.md)
* [module API](doc/base/module-api.md)
* [tunk-react](doc/plugins/tunk-react.md)
* [tunk-vue](doc/plugins/tunk-vue.md)
* [tunk-wechat](doc/plugins/tunk-wechat.md)

### 组件开发

* [middleware](doc/plugin-dev/middleware.md)
* [hooks](doc/plugin-dev/hooks.md)
* [store](doc/plugin-dev/store.md)
* [config](doc/plugin-dev/config.md)

### 组件推荐

* [tunk-debug](doc/plugins/tunk-debug.md)
* [tunk-request](doc/plugins/tunk-request.md)
* [tunk-loader](doc/plugins/tunk-loader.md)

