/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-07-24 10:52:01
 * @version $Id$
 */
//window模块，Window类
define(['jquery', 'jqueryUI', 'widget'], function($, $UI, widget) {
    function Window(options) {
        this.options = $.extend({}, Window.DEFAULTS, options);
        //在Widget类构造函数中拿到this.handlers 属性放在Window构造函数中
        //方法放在原型中
        widget.Widget.call(this);
    }
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
    //将Widget的原型和后面的进行合并返回一个新的对象作为Window的原型
    Window.prototype = $.extend({}, widget.Widget.prototype, {
        //实现接口，添加DOM节点
        renderUI: function() {
            var opt = this.options,
                footerContent = "";
            //根据winType选择不同的弹窗内容
            switch (opt.winType) {
                //alert类型弹窗 footer一个按钮
                case 'alert':
                    footerContent =
                        '<input type="button" value="' + opt.text4AlertBtn + '" class="window_alertBtn"/>';
                    break;
                    //confirm类型弹窗 footer两个按钮
                case 'confirm':
                    footerContent = '<input type="button" value="' +
                        opt.text4ConfirmBtn + '" class="window_confirmBtn"/><input type="button" value="' + opt.text4CancelBtn + '" class="window_cancelBtn" />';
                    break;
                    //prompt类型弹窗 输入框加两个按钮
                case 'prompt':
                    opt.content +=
                        '<p class="window_promptInputWrapper">' +
                        '<input type="' + (opt.isPromptInputPassword ? "password" : "text") +
                        '" placeholder="' + opt.defaultValue4PromptInput +
                        '" maxlength="' + opt.maxlength4PromptInput +
                        '" class="window_promptInput" />' +
                        '</p>';
                    footerContent = '<input type="button" value="' +
                        opt.text4PromptBtn + '" class="window_promptBtn"/><input type="button" value="' + opt.text4CancelBtn + '" class="window_cancelBtn" />';
                    break;
            }
            // this.boundingBox是在Window实例上的属性
            this.boundingBox = $(
                '<div class="window_boundingBox">' +
                '<div class="window_body">' + opt.content + '</div>' +
                '</div>'
            );
            //判断不是common类型弹窗
            if (opt.winType !== 'common') {
                this.boundingBox.prepend('<div class="window_header">' + opt.title + '</div>');
                this.boundingBox.append('<div class="window_footer">' + footerContent + '</div>');
            }
            //如果是promtp类型，则添加属性_promptInput便于操作
            if (opt.winType === 'prompt') {
                this._promptInput = this.boundingBox.find('.window_promptInput');
            }
            //是否有遮罩层
            if (opt.hasMask) {
                this._mask = $('<div class="window_mask"></div>');
                $('body').append(this._mask);
            }
            //是否有右上角关闭按钮
            if (opt.hasCloseBtn) {
                this.boundingBox.append($('<span class="window_closeBtn">X</span>'));
            }
            //将弹窗添加到body
            $('body').append(this.boundingBox);
        },
        //实现接口，监听事件
        bindUI: function() {
            var that = this,
                opt = this.options;
            //给各种按钮绑定事件监听器,点击后会fire对应事件然后执行destroy方法
            this.boundingBox.on('click', '.window_alertBtn', function(event) {
                that.fire('alert');
                that.destroy();
            }).on('click', '.window_closeBtn', function(event) {
                that.fire('close');
                that.destroy();
            }).on('click', '.window_confirmBtn', function(event) {
                that.fire('confirm');
                that.destroy();
            }).on('click', '.window_cancelBtn', function(event) {
                that.fire('cancel');
                that.destroy();
            }).on('click', '.window_promptBtn', function(event) {
                that.fire('prompt', that._promptInput.val());
                that.destroy();
            });
            //给各种handler配置绑定事件
            if (opt.handler4AlertBtn) {
                this.on('alert', opt.handler4AlertBtn);
            }
            if (opt.handler4CloseBtn) {
                this.on('close', opt.handler4CloseBtn);
            }
            if (opt.handler4ConfirmBtn) {
                this.on('confirm', opt.handler4ConfirmBtn);
            }
            if (opt.handler4CancelBtn) {
                this.on('cancel', opt.handler4CancelBtn);
            }
            if (opt.handler4PromptBtn) {
                this.on('prompt', opt.handler4PromptBtn);
            }
        },
        //实现接口，初始化组件属性
        syncUI: function() {
            var opt = this.options,
                boundingBox = this.boundingBox;
            //给最外层容器添加样式
            boundingBox.css({
                width: opt.width,
                height: opt.height,
                left: ($(window).innerWidth() - opt.width) / 2,
                top: ($(window).innerHeight() - opt.height) / 2
            });
            //如果传入skinClassName则在boundingBox上增加此类
            if (opt.skinClassName) {
                boundingBox.addClass(opt.skinClassName);
            }
            //是否可拖拉以及可拖动区域
            if (opt.isDraggable) {
                if (opt.dragHandle) {
                    boundingBox.draggable({
                        handle: opt.dragHandle
                    });
                } else {
                    boundingBox.draggable();
                }
            }
        },
        //实现接口，销毁前的处理函数，移除遮罩层
        destructor: function() {
            if(this._mask){
                this._mask.remove();
            }
        },
        //下列是外界能调用的Window类实例方法
        alert: function() {
            $.extend(this.options, {
                winType: 'alert'
            });
            this.render();
            return this;
        },
        confirm: function() {
            $.extend(this.options, {
                winType: 'confirm'
            });
            this.render();
            return this;
        },
        prompt: function() {
            $.extend(this.options, {
                winType: 'prompt'
            });
            this.render();
            this._promptInput.focus();
            return this;
        },
        common: function() {
            $.extend(this.options, {
                winType: 'common'
            });
            this.render();
            return this;
        }
    });
    return {
        window: Window
    };
});
