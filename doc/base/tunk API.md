
#### tunk.use(plugins:Array)
> 使用tunk组件，了解tunk组件开发，可戳这里 [tunk组件开发](https://github.com/tunkjs/tunk/blob/master/doc/tunk%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91.md) 

````javascript
import tunk from "tunk";
import tunkVue from "tunk-vue";
import tunkDebug from "tunk-debug";
tunk.use([tunkVue, tunkDebug]);
````
#### tunk.config(configs:Object)
> tunk全局配置

````javascript
// debug配置由debug组件提供支持，设为true可查看全局相关debug log
tunk.config({debug:true});
````

#### @create([moduleName:String, options:Object])
> create修饰器，用于重构模块类及生成模块实例
> 
> **moduleName**：由于UgligyJS会将类名压缩，因此没使用tunk-loader的话需要传入需要创建的模块名
> 
> **options**：为模块级别的配置，将覆盖全局配置中同名字段的配置
> 
> 如仅查看某个action的相关debug log: 

````javascript:
tunk.config({debug:false});
// 在特定的模块create修饰器传入即可

@create({debug: true})
class someModule{
	...
}
````

#### @action([options:Object])
> action修饰器，用于定义一个方法为一个Action
> 
> **options**：为action级别的配置，将覆盖模块配置中同名字段的配置
> 
> 跟全局配置与模块配置的关系，相当于
> 
> `Object.assign(globalConfig, moduleConfig, actionConfig)`
> 
> 如仅查看某个action的相关debug log: `@action({debug: true})`

#### tunk.Create(moduleName:String, module:Object, [options:Object])
> 若语法环境不支持修饰器的写法，tunk还提供了ES5写法
> 
> **moduleName**：模块名
> 
> **module**：模块对象，对象必须有constructor方法
> 
> **options**：模块配置，同@create(options) 作用一致

````javascript
tunk.Create('userAdmin', {
	constructor: function userAdmin(){
		this.state = {
			list:[]
		};
	}
}, {debug:true});
````

#### tunk.Action(target:Function, [options:Object])
> 跟tunk.Create配合使用，定义一个方法为Action
> 
> **target**：需要被定义为Action的函数
> 
> **options**：action级别的配置，同@action(options) 作用一致

````javascript
tunk.Create('userAdmin', {
	constructor: function userAdmin(){
		this.state = {
			list:[]
		};
	},
	fetchList: tunk.Action(function(){
		...
	}, {debug: true}),
});
````