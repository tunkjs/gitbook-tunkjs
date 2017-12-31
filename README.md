
<div style="text-align:center; margin-bottom:50px;">
<img style="width: 200px;" src="https://github.com/tunkjs/gitbook-tunkjs/blob/master/img/logo1x.png?raw=true" alt="tunk logo">
</div>

### tunkjs是什么
简单来说，tunkjs是一个应用状态管理器。它需要跟视图框架配合构成一个完整的web应用，tunk为视图层提供一个数据服务，而状态管理只是这个数据服务的一部分。

tunk的目标是提供良好的应用架构及编程体验，减少繁琐的为框架而码的代码，让攻城狮们更专注于业务代码的实现。

tunk的工作是为视图层提供一个数据服务，而状态管理只是这个数据服务的一部分，因为很多场景下从数据源获得的“用完即焚”的数据并不应该被持久化。

你需要面向业务数据逻辑对象来设计状态管理模块，并且仅能由所属模块定义的Action去更新所属模块定义的状态，而模块实际不存储状态数据，这样的机制利于代码职责的划分及控制不可预知的状态变化。

对于视图组件来说，tunk提供的是一个数据服务，组件可以轻松订阅需要的数据，也可以主动获取Action返回的处理结果。





