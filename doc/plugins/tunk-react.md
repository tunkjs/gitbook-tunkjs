# tunk-react
tunk-react定义了react与tunk配合工作的方式： **触发Action** 及 **将新状态注入视图组件**

####A. 如何触发模块的Action

 两种方式：

1. 通过添加`actions`属性向视图组件注入Action代理方法
2. 使用tunk-vue提供的 `this.dispatch('moduleName.actionName', [arg1, arg2, ...])`，支持返回action内执行return的内容，支持Promise 



````javascript

````


####B. 如何将Store状态注入到视图组件
两种方式：

1. 被动注入：通过给组件添加订阅状态属性`state`，设置要订阅的模块状态字段路径，该视图组件将会被动态注入相关的状态数据
2. 主动获取：tunk-vue为vue组件提供的 `dispatch`方法，可获得action方法return的内容
