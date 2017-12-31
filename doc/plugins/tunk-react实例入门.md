# tunk-react实例入门


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


