/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-07-24 10:52:23
 * @version $Id$
 */
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
