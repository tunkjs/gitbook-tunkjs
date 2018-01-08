## tunk-debug


tunk开发的debug工具，设置了 debug:true 之后的动作执行，在console中会有相应详细信息输出


### 安装 
````javascript 
npm install tunk-debug
```` 

### 引用
````javascript
import tunkDebug from 'tunk-debug'
tunk.use([tunkDebug]);
````

## 启用配置
#### debug:[true | false | Array] default: false 
````javascript

// 1、全局配置debug，作用到所有模块和action
tunk.config({debug:true});

// 2、针对模块配置，仅作用于该模块，及该模块的所有action
@create({debug: true})
class demo {
    constructor(){
        ....
    }
    // 3、针对ation配置，仅作用于该action
    @action({debug:false})
    sayHi(){
        ...
    }

}

````

#### 当debug为Array时，元素取值为hooks名，仅打出传入的hooks

> 本插件会在console打印出所有hooks名

````javascript
tunk.config({debug: ['setState', 'getState']});
````

----

[github](https://github.com/tunkjs/tunk-debug)
 
