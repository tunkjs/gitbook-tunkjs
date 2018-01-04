## tunk-vue实例入门

**tunk-vue** 顾名思义，是让tunk与vue可以一起工作的组件，负责定义视图层如何 **触发Action** 及如何 **将新状态注入到视图组件**。

#### A. 两种方式触发模块的Action

1. 通过添加`actions`属性向视图组件注入Action代理方法
2. 使用tunk-vue提供的 `this.dispatch('moduleName.actionName', [arg1, arg2, ...])`，支持返回action内执行return的内容，支持Promise 

> 注意： `$dispatch`是vue内置的方法，不带 **$** 的是tunk-vue提供的方法

````html
<template>
  <ul>
	  <li v-for="item in list">
		 ...
		 <button @click="showUserDetails(item.id)">查看用户信息</button> 
	  </li>
  </ul>
  ...
</template>
<script>
export default {
	actions:{
		// 设置actions，注入action代理方法
		getDetails: 'userAdmin.getUserDetails',
	},
	created(){
		// 通过dispatch方式调起action
		this.dispatch('userAdmin.fetchList');
	},
	methods:{
		async showUserDetails(id){
			// 调用action代理方法
			const details = await this.getDetails(id).details;
		}
	}
}
</script>
````

#### B. 两种方式获得Action处理结果

1. **被动注入**：通过给组件添加订阅状态属性`state`，设置要订阅的模块状态字段路径，该视图组件将会被动态注入相关的状态数据
2. **主动获取**：tunk-vue为vue组件提供的 `dispatch`方法，可获得action方法return的内容

````html
<template>
  <ul>
	  <li v-for="item in list">
		 ...
		 <button @click="showUserDetails(item.id)">查看用户信息</button> 
	  </li>
  </ul>
  ...
</template>
<script>
export default {
	// 状态订阅配置
	state: {
		// list 是userAdmin定义的状态字段
		// 组件被初始化后this.list将被注入当前 userAdmin.list 的状态
		list: 'userAdmin.list'
	},
	created(){
		this.dispatch('userAdmin.fetchList');
	}
	methods: {
		async showUserDetails(id) {
			// 主动获取用户详情
			const details = await this.dispatch('userAdmin.getUserDetails', id).details;
			...
		}
	}
}
</script>
````

> tunk-vue 在 beforeCreate 事件完成state及action的初始化，在 beforeDestroy 释放相关引用 
> 

----

[tunk-vue完整实例入门](./tunk-vue实例入门.md)

[更多tunk实例](https://github.com/tunkjs/examples)











