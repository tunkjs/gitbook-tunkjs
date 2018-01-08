## tunk-react


#### tunk-react定义了react与tunk配合工作的方式： **触发Action** 及 **将新状态注入视图组件**

----

### 安装
````javascript
npm install tunk-react -S
````

### 引入
````javascript
import tunk from 'tunk';
import tunkReact from 'tunk-react';
tunk.use([tunkReact, tunkDebug]);
// 引入状态管理模块即可完成状态管理模块的初始化
//require('./userAdmin');
// 也可批量引入（通常我们都把模块js放到统一目录下，如：modules）
var modules = require.context('./modules', true, /\.js$/);
modules.keys().forEach((item) => {
  modules(item);
});
````



### A. 如何调起模块的Action
````javascript
import { connect } from 'tunk-react'
@connect({}, {// 代理action设置
	// 创建getDetails方法可调起模块的getUserDetails
	getDetails: 'userAdmin.getUserDetails'
	// 若设置为 userAdmin: 'userAdmin'
	// 则将所有方法注入到userAdmin属性
	// 通过 this.userAdmin.getUserDetails(...) 调用
})
export default class UserAdmin extends Component {
	constructor() {
		// 1、通过dispatch方式调起action
		this.dispatch('userAdmin.fetchList');
	}
	async showUserDetails(id) {
		// 2、调用action代理方法
		this.getDetails(id).details;
	}
  render() {
    const { list } = this.props;
    return (<ul>
        {list.map(item => (<li key={item.id}>
          ...
          <button onClick={this.showUserDetails.bind(this, item.id)}>查看用户信息</button> 
        </li>))}
      </ul>)
	}
}
````

#### 两种方式调起action
1. 通过在connect设置action注入配置，向视图组件注入Action代理方法
2. 使用tunk-react提供的 `this.dispatch('moduleName.actionName', [arg1, arg2, ...])`，支持返回action内执行return的内容，支持Promise 

----

### B. 视图组件获得新状态

````javascript
import { connect } from 'tunk-react'
@connect({ // 1、状态订阅配置
	// list 是模块userAdmin定义的状态字段，可以被视图组件订阅
  // 组件被初始化后this.list将被作为prop注入当前 userAdmin.list 的状态
  // 注入前触发 componentWillReceiveProps
	list: 'userAdmin.list'
})
export default class UserAdmin extends Component {
	constructor() {
    // 通过dispatch方式调起action
    // action返回状态字段数据更新store状态树状态，从而注入到当前组件
		this.dispatch('userAdmin.fetchList');
	}
	async showUserDetails(id) {
		// 2、调用action代理方法，并获得action执行结果
		const details = await this.getDetails(id).details;
		// 也可以通过dispatch调起action获得action执行结果
		// const details = await this.dispatch('userAdmin.getUserDetails', id).details;
	}
  render() {
    // 以prop的方式注入到当前组件
    const { list } = this.props;
    return (<ul>
        {list.map(item => (<li key="item.id">
          ...
          <button onClick={this.showUserDetails.bind(this, item.id)}>查看用户信息</button> 
        </li>))}
      </ul>)
	}
}
````

#### 两种方式获得新状态
1. **被动注入**：通过给组件添加订阅状态属性`state`，设置要订阅的模块状态字段路径，该视图组件将会被动态注入相关的状态数据
2. **主动获取**：tunk-vue为vue组件提供的 `dispatch`方法，可获得action方法return的内容

----

[更多tunk实例](https://github.com/tunkjs/examples)

[github](https://github.com/tunkjs/tunk-react)
