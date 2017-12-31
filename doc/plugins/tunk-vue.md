## tunk-vue实例入门

> 本篇教程不对tunk作过多的讲解，若想了解 tunk [请戳这里]()

tunk除了可以跟vue配合，还可以跟react、rn、微信小程序等任何视图框架配合，只需要一个将tunk连接到视图框架的组件。

**tunk-vue** 顾名思义，是让tunk与vue可以一起工作的组件，负责定义视图层如何 **触发Action** 及如何 **将新状态注入到视图组件**。

####A. 如何触发模块的Action

 两种方式：

1. 通过添加`actions`属性向视图组件注入Action代理方法
2. 使用tunk-vue提供的 `this.dispatch('moduleName.actionName', [arg1, arg2, ...])`，支持返回action内执行return的内容，支持Promise 

> 注意： `$dispatch`是vue内置的方法，不带 **$** 的是tunk-vue提供的方法

````html
<template>
  <main>
  	<button v-for="item in list" @click="delTodo(item.id)"> Delete Todo </button>
  	<button @click="addTodo"> Add Todo </button>
  </main>
</template>
<script>
export default {
	data() {
		return {
			inputVal: '',
			list: []
		}
	},
	
	actions: {
		delTodo: 'todo.del'
	},
	
	created() {
		this.fetchTodoList();
	},
	methods: {
		addTodo() {
			this.dispatch('todo.add', this.inputVal);
		},
		async fetchTodoList() {
			this.list = await this.dispatch('todo.fetchList');
		}
	}
}
</script>

````

####B. 如何将Store状态注入到视图组件
两种方式：

1. 被动注入：通过给组件添加订阅状态属性`state`，设置要订阅的模块状态字段路径，该视图组件将会被动态注入相关的状态数据
2. 主动获取：tunk-vue为vue组件提供的 `dispatch`方法，可获得action方法return的内容

````html
<template>
  <ul>
  	<li v-for="item in list">...</li>
  </ul>
  <button @click="reloadTodoList"> Reload Todo List </button>
</template>
<script>
export default {
	data() {
		return {
			count: 0
		};
	},
	state: {
		// list 是todo定义的状态字段
		list: 'todo.list',
		// list是数组，获取数组第一个元素的id
		theFirstItemId: 'todo.list.0.id'
	},
	methods: {
		async reloadTodoList() {
			const res = await this.dispatch('todo.fetchList');
			this.count = res.total_count;
		}
	}
}
</script>

````

> tunk-vue 在 beforeCreate 事件完成state及action的初始化，在 beforeDestroy 释放相关引用 
> 



















