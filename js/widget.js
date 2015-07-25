/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-07-24 23:15:25
 * @version $Id$
 */
//Widget父类模块
define(['jquery'], function($) {
    function Widget() {
        //Widget类的handlers，boundingBox属性
        this.handlers = {};
        this.boundingBox = null;
    }
    Widget.prototype = {
        //传人事件类型和函数，则在this.handlers中对应添加
        on: function(type, handler) {
            //这里不要用handlers=this.handlers[type] 因为一开始都是undefined ，后来更改后则不相等
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        //传入事件类型和数据，则在this.handlers中对应执行该类全部事件
        fire: function(type, data) {
            var handlers = this.handlers[type];
            if (handlers instanceof Array) {
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](data);
                }
            }
        },
        //方法：渲染组件
        render: function(container) {
            //添加DOM节点，监听事件，初始化组件属性
            this.renderUI();
            this.syncUI();
            this.bindUI();
        },
        //方法：销毁组件
        destroy: function(argument) {
            //移除遮罩
            this.destructor();
            //移除boundingBox所有事件监听器
            this.boundingBox.off();
            //移除boundingBox
            this.boundingBox.remove();
        },
        //下列4个接口供子类重写
        //接口：添加DOM节点
        renderUI: function() {},
        //接口：监听事件
        bindUI: function() {},
        //接口：初始化组件属性
        syncUI: function() {},
        //接口：销毁前的处理函数
        destructor: function() {}
    };
    return {
        Widget: Widget
    };
});
