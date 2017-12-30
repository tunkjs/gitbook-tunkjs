
<div style="text-align:center; margin-bottom:50px;">
<img style="width: 400px;" src="../../img/logo.png" alt="tunk logo">
</div>



实现了交互逻辑和数据处理逻辑轻松解耦的应用状态管理框架。

你需要面向业务数据逻辑对象来设计状态管理模块，并且仅能由所属模块定义的Action去更新所属模块定义的状态，而模块实际不存储状态数据，这样的机制利于代码职责的划分及控制不可预知的状态变化。

对于视图组件来说，tunk提供的是一个数据服务，组件可以轻松订阅需要的数据，也可以主动获取Action返回的处理结果。

 