#### this.state
> 在constructor内可同步设置初始状态数据
> 初始化之后为只读属性，读取当前模块所维护的状态，二次赋值将报错
> this.state实际不存储状态，读取的数据都来自store字段名为模块名的节点

#### this.getState([statePath:string])
> `this.getState()` 不传参数读取的是当前模块的状态
> 
> `this.getState('userAdmin')` 获取模块名为'userAdmin'的模块负责维护的所有状态
> 
> `this.getState('userAdmin.list')` 获取模块名为'userAdmin'的模块字段名为'list'的状态
> 
> `this.getState('userAdmin.list.0.id')` 获取模块名为'userAdmin'的模块字段名为'list'的数据是一个数组，那么将读取这个数组第一个元素的id
> 
> 这种对象深度读取的方式由tunk内置的Store对象提供，最多可读取深度为5的数据

#### this.dispatch([arg1, arg2, arg3...])
> dispatch分发数据到中间件，的功能由中间件提供
> tunk有两个内置中间件：调起action中间件，保存状态中间件
> > 
> > 调起action中间件：
> > 
> > > `this.dispatch(actionPath:String, [arg1, arg2...])`
> > 
> > > **actionPath**：由模块名和action名组成，如：'userAdmin.fetchList'，也可直接写，如果是当前模块的action，可直接写action名如：‘fetchList’。
> > 
> > > **args**：支持向fetchList传入多个参数
> > 
> > 状态保存中间件：
> > 
> > > `this.dispatch(newState:Object)`
> > > 
> > > **newState** 如果判断到传入的是一个参数且为Object类型，将会通过该中间件保存到store中
> 

[关于tunk中间件的作用及如何开发业务中间件]()

#### return in Action
> action方法return的内容，自动跑dispatch流程，相当于 `this.dispatch(obj)`
> 
> 通常return的是Object类型参数，通过**状态保存中间件**更新到store被当前模块维护的节点中

#### methods in module
> 当前模块的action及非action方法都可以直接用`this.method([arg1, arg2...])`的方式调起

#### mixin methods
> 由组件提供的模块通用内置方法，如何添加mixin方法，请查看 [tunk组件开发](https://github.com/tunkjs/tunk/blob/master/doc/tunk%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91.md) 

