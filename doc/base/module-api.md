# module API

<!-- toc -->
## constructor
构造器负责完成一些模块初始化操作，如状态字段的定义

````javascript
constructor() {
    this.state = {
        ....
    };
    .... do something
}
````

## state

定义状态树节点的数据

state属性只能在`constructor`内赋值，模块初始化之后会在Store状态树中生成与模块类名同名的节点，state被赋予的值作为该节点的内容

````javascript
@create
class userAdmin{
    constructor() {
        this.state = {
            list:[],
            total: 0
        };
    }
}


        /*
        初始化后，store状态树生成节点
        state tree  {
            userAdmin: {
                list:[],    // 状态字段list
                total: 0    // 状态字段total
            }
            ....其他节点
        }
        */
````

state的值必须是一个Object对象，对象的字段和字段对应的初始值作为该模块定义的状态字段及字段初始值

模块实际不存储数据，读取的数据都来自状态树相应节点的状态快照

## getState
获得当前模块对应状态树节点的状态快照

`this.getState([statePath:string]);` 

````javascript
myMethodOfModule(){

    // 不传参数读取的是当前模块的状态，读取数据就用到 this.getState();
    this.getState(); 

    // 获取模块名为'userAdmin'的模块字段名为'list'的状态
    this.getState('userAdmin.list');

    // 模块名为'userAdmin'的模块字段名为'list'的数据是一个数组，将读取这个数组第一个元素的id
    this.getState('userAdmin.list.0.id');

}
````

## dispatch
内容分发，负责从action或非aciton方法中将数据传入tunk进入到后续处理环节

`this.dispatch([arg1, arg2, arg3...]);`

dispatch只起到一个传递数据的作用，传参格式由中间件决定，tunk内部内置三个中间件：Promise中间件、Action调起中间件、状态合并中间件。这里只讲述dispatch默认支持哪些参数传递。

**Action调起中间件**

`this.dispatch('moduleName.actionName'[, arg1, arg2...])`

如：`this.dispatch('userAdmin.fetchList');`

调起当前模块的action可以省略moduleName，`this.dispatch('fetchList')`

**Promise中间件**

`this.dispatch(new Promise((resolve)=>{resolve({stateName: value});}))`

异步action也是通过Promise中间件实现的

promise中间件执行完，由于产生数据变更会将promise处理结果重新dispatch进入中间件处理

**状态合并中间件**

`this.dispatch({stateName: value})`

数据流入中间件处理流程之后，当数据传递到状态合并中间件的时候，如果是一个参数并且参数是一个Object对象，就会进入到状态合并中间件处理流程，将数据递交给Store处理

关于更多中间件的内容，请查看 [组件开发-中间件](../plugin-dev/middleware.md)

## mixin methods
由组件提供的模块通用内置方法，详细请查看 [tunk组件开发 - mixin](../plugin-dev/mixin.md) 

譬如，tunk-request 组件提供模块内置方法：request

模块的方法内可直接使用：`this.request(...);`
