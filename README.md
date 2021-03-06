# window_module
弹窗组件  模块化代码

#使用方法
```js
//在主模块文件js/main.js中可以这样调用
require.config({
    paths: {
        'jquery': 'jquery-2.1.1.min',
        'jqueryUI': 'http://code.jquery.com/ui/1.10.4/jquery-ui'
    }
});
require(['jquery', 'window'], function($, w) {
    $('#a').click(function(event) {
        var win = new w.window({
            width: 300,
            height: 150,
            content: 'welcome',
            title: '提示',
            skinClassName: 'window_skin_a',
            text4AlertBtn: 'ok',
            dragHandle: '.window_header',
            text4ConfirmBtn: '是',
            text4CancelBtn: '否',
            handler4AlertBtn: function(argument) {
                console.log('the first alert alertBtn');
            },
            handler4CloseBtn: function(argument) {
                console.log('the first close closeBtn');
            },
            handler4ConfirmBtn: function(argument) {
                console.log('confirm btn');
            },
            handler4CancelBtn: function(argument) {
                console.log('cancel btn');
            }
        }).confirm();
    });
    $('#b').click(function(event) {
        var win = new w.window({}).alert();
    });
    $('#c').click(function(event) {
        var win = new w.window({
            title: '请输入你的名字',
            content: '我们将会为你保密你输入的信息',
            width: 300,
            height: 150,
            text4PromptBtn: '输入',
            text4CancelBtn: '取消',
            defaultValue4PromptInput: '张三',
            dragHandle: '.window_header',
            handler4PromptBtn: function(inputValue) {
                console.log('the value is ' + inputValue);
            },
            handler4CancelBtn: function(argument) {
                console.log('cancel');
            }
        }).prompt();
    });
    $('#d').click(function(event) {
        var win = new w.window({
            content: '我是一个通用弹窗',
            width: 300,
            height: 150,
            hasCloseBtn: true
        }).common();
    });
});
```
#配置参数
```js
//Window类默认参数
    Window.DEFAULTS = {
        width: 500, //最外层容器宽度
        height: 300, //最外层容器高度
        content: 'Hello World', //body内容
        title: '系统消息',
        skinClassName: null, //弹窗使用的皮肤类
        hasCloseBtn: false, //是否有关闭按钮
        hasMask: true, //是否有遮罩层
        text4AlertBtn: '确认',
        text4ConfirmBtn: '确定',
        text4CancelBtn: '取消',
        text4PromptBtn: '确定',
        handler4CloseBtn: null, //关闭按钮处理程序
        handler4AlertBtn: null,
        handler4ConfirmBtn: null,
        handler4CancelBtn: null,
        handler4PromptBtn: null,
        isDraggable: true,
        isPromptInputPassword: false,
        dragHandle: null, //拖拉把手
        defaultValue4PromptInput: '',
        maxlength4PromptInput: 10
    };
在新建Window对象时传入配置参数
```

#主要学习requirejs使用和模块化写法
弹窗模块。分为alert弹窗，confirm弹窗，prompt弹窗，common弹窗。
可以传入不同的参数，调用对应的实例方法
