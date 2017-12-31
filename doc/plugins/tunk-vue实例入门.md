# tunk-vue实例入门

#### 第一步：引入相关模块
````javascript
npm install -S tunk
npm install -S vue
npm install -S tunk-vue
npm install --save tunk-loader
````

#### 第二步：webpack配置
js编译加上 **[tunk-loader]()**

````javascript
{
    test: /\.js$/,
    loader: ['babel-loader','tunk-loader'],
    exclude: /(node_modules)/
}
````

由于要用到ES6的修饰器，需要依赖：babel-plugin-transform-decorators-legacy
 
.babelrc 的plugin加上 “transform-decorators-legacy”

#### 第三步：初始化配置，通常写在应用入口文件

````javascript
//完成vue、tunk、tunk-vue的引入及绑定
import Vue from 'vue';
import tunk from "tunk";
import tunkVue from "tunk-vue";

// tunk使用tunk-vue组件
tunk.use([tunkVue]);
Vue.use(tunk);

// 引入状态管理模块即可完成状态管理模块的初始化
//import './userAdmin';
// 也可批量引入（通常我们都把模块js放到统一目录下，如：modules）
var modules = require.context('./modules', true, /\.js$/);
modules.keys().forEach((item) => {
  modules(item);
});
````

#### 第四步：编写模块 userAdmin.js，放置在modules目录

````javascript
// 一个用户管理模块
import {create, action} from 'tunk'
// 创建模块类实例
@create
class userAdmin {
	constructor(){
		// 定义存储到store相关节点的状态字段 list
		this.state = {
			list:[]
		}
	}
	@action
	fetchList(param){
		const res = this.request(...);
		// 更新list新状态更新到store
		// 订阅了当前模块相关状态的视图组件将获得新状态的注入
		return {list: res.list};
	}

	@action
	async getUserDetails(id){
		const res = await this.request(...);
		// 由于this.state未定义details字段，此action执行完后不会将details更新到store
		// 通过 const details = await this.dispatch('userAdmin.getUserDetails', id); 可获得return的数据
		return {details: res.data};
	}
	@action 
	delUser(){
		...
	}
	// 非action方法
	someFunc(){
		...
	}
	...
}
````

> 状态管理模块与视图组件是并非一对一的关系，所有状态管理模块共同组成了一个数据服务层，视图组件可以订阅任意模块的状态数据。


#### 第五步：编写vue组件 userAdmin.vue

````javascript
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
	data() {
		return {
			count: 0
		};
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
