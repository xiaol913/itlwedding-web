(function (win, doc, $) {
//            构造函数。options用于实例化时传入构造信息
    function CusScrollBar(options) {
        this._init(options);
    }
//            使用extend
    $.extend(CusScrollBar.prototype,{
        _init:function (options) {
            var self = this;
//                    将这些属性以自变量的形式存储
            self.options = {
                scrollDir     :"y", //滚动的方向
                contSelector  :"",  //滚动内容区选择器
                barSelector   :"",  //滚动条选择器
                sliderSelector:"",  //滚动滑块选择器
                itemCount     :"",  //内容小块总数
                itemWidth     :"",  //内容小块宽度
                wheelStep     :10   //滚动步长（鼠标移动一下，内容滚动的幅度）
            };
            $.extend(true, self.options,options||{});

            self._initDomEvent();

            return self;
        },
        /**
         * 初始化DOM引用
         * @method _initDomEvent
         * @return {CusScrollBar}
         */
        _initDomEvent:function () {
            var opts = this.options;
            //滚动内容区对象
            this.$cont = $(opts.contSelector);
            //滚动条滑块对象
            this.$slider = $(opts.sliderSelector);
            //滚动条对象
            this.$bar = opts.barSelector ? $(opts.barSelector) : self.$slider.parent();
            //内容小块总数
            this.$item = opts.itemCount;
            //内容小块宽度
            this.$width = opts.itemWidth;
            //获取文档对象
            this.$doc = $(doc);

            this._initSliderDragEvent();
            this._initSliderWidth();
            this._bindMouseWheel();
        },

        // 根据内容来定义滑块的宽度
        _initSliderWidth: function() {
            var self = this;
            var sliderWidth = self.$cont.width() * self.$cont.width() / Math.max(self.$cont.width(), self.$item * self.$width);
            this.$slider.css('width',sliderWidth);
        },
        //滑块可移动的距离
        getMaxSliderPosition: function(){
            var self = this;
            return self.$bar.width() - self.$slider.width();
        },
        // 计算滑块的当前位置
        getSliderPosition: function() {
            var self = this;
            var maxSliderPosition = self.getMaxSliderPosition();
            // 滑块移动的距离
            return Math.min(maxSliderPosition, maxSliderPosition*self.$cont.position().left/self.getMaxScrollPosition());
        },
        //内容可滚动宽度
        getMaxScrollPosition: function () {
            var self = this;
            return Math.max(self.$cont.width(), self.$item * self.$width) - self.$cont.width();
        },
        //内容滑动
        scrollTo: function (scrollVal) {
            var self = this;
            var maxScroll = 0 - self.getMaxScrollPosition();
            if(scrollVal > 0){
                scrollVal = 0;
            }else if(scrollVal < maxScroll){
                scrollVal = maxScroll;
            }
            self.$cont[0].style.left = scrollVal + 'px';
            // 内容移动同步滚动条
            self.$slider[0].style.left =  - self.getSliderPosition() + 'px';
        },
        //监听鼠标滚轮事件
        _bindMouseWheel: function () {
            var self = this;
            self.$cont.on('mousewheel DOMMouseScroll', function (e) {
                e.preventDefault();
                // 判断原生事件对象的属性
                var oEv = e.originalEvent,
                    //原生事件对象,（其他浏览器负数向下，firefox正数向下,所以在wheelDelta前面有负数）
                    // 想要达到的效果，鼠标向下滚动，内容向左移动
                    wheelRange = oEv.wheelDelta ? oEv.wheelDelta/120 : (oEv.detail || 0)/3;
                var scrollVal = self.$cont.position().left + wheelRange*self.options.wheelStep;
                // 调用scrollTo方法。
                self.scrollTo(scrollVal);
            });
        },
        //初始化滑块拖动功能
        _initSliderDragEvent : function () {
            var self = this;
            var slider = this.$slider,
                sliderEl = slider[0];
            if(sliderEl){
                var doc = this.$doc,
                    dragStartPagePosition,
                    dragStartScrollPosition,
                    dragContBarRate;
                function mousemoveHandler(e) {
                    e.preventDefault();
                    if(dragStartPagePosition == null){
                        return;
                    }
                    var sliderVal = - e.pageX + dragStartPagePosition;
                    var scrollVal = dragStartScrollPosition + sliderVal* dragContBarRate;
                    self.scrollTo(scrollVal);
                }
                slider.on("mousedown", function (e) {
                    e.preventDefault();
                    dragStartPagePosition = e.pageX;
                    dragStartScrollPosition = self.$cont.position().left;
                    dragContBarRate = self.getMaxScrollPosition()/self.getMaxSliderPosition();
                    doc.on('mousemove.scroll', mousemoveHandler).on('mouseup.scroll',function(){
                        doc.off('.scroll');
                    });
                });
                return self;
            }
        }
    });
    win.CusScrollBar = CusScrollBar;
})(window, document, jQuery);

// 判断是否为Nan
var getCss = function(o,key){
    return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};

/**
 * touch事件元素移动
 * @param element 内容ID
 * @param count 内容块数量
 * @param bar 滑动条ID
 * @param slider 滑块ID
 * @param width content-item 的宽度
 */
function touchMove(element, count, bar, slider, width) {
    var hammer = new Hammer(element);
    var x = 0;
    // 判断可滑动距离
    var width = Math.max(count * width, parseInt(getCss(element, 'width'))) - parseInt(getCss(element, 'width'));
    var maxSliderPosition = parseInt(getCss(bar,"width")) - parseInt(getCss(slider,"width"));
    element.style.left = getCss(element,"left");
    hammer.on('panstart', function (e) {
        if(e.pointerType == 'touch'){
            // 获取当前left值
            x = parseInt(element.style.left);
        }
    });
    hammer.on('panmove', function (e) {
        if(e.pointerType == "touch"){
            var left = x + e.deltaX;
            if(left > - width && left < 0){
                element.style.left = left + 'px';
                slider.style.left = Math.max(-maxSliderPosition, -maxSliderPosition*parseInt(element.style.left)/width) + 'px';
            }
        }
    });
}