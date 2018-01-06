## tunk-loader

#### webpack loader，用于处理使用修饰器时tunk模块被打包压缩时模块类名被压缩的尴尬


### 安装
````javascript
npm install tunk-react -S
````

### 配置

````Javascript
      {
        test: /\.js$/,
        loader: ['babel-loader', 'tunk-loader'],
        exclude: /(node_modules)/
      }
````

----

[github](https://github.com/tunkjs/tunk-loader)
