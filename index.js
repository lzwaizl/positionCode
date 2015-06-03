
//http://tms.taobao.com/press/preview.htm?id=1812180

;(function () {

	var body = document.body;
	var repeated = false;

	lzwai = {

		container_ele: null, // 容器
		data_styles: {},     // 样式存储
		box_id_count: 0,     // 计数器

		showCoords : function(c) {
			var self = this;

			repeated = true;

		    $(body).attr({
		        "data-x": c.x,
		        "data-y": c.y,
		        "data-w": c.w,
		        "data-h": c.h
		    });
		},

		countData : function() {  // 页面填充链接 交互
			var self = this;
		    var x = $(body).attr("data-x"),
		    	y = $(body).attr("data-y"),
		    	w = $(body).attr("data-w"),
		    	h = $(body).attr("data-h"),
		 		c_width = self.container_ele.width(),
		 		c_height = self.container_ele.height(),
		 		class_tiny = (h < 100 || w < 100 ) ? "no-title tiny-input" : "",
		    	div = $("<div></div>"),
		    	delBtn = "<div class='box-content " + class_tiny + "'><div>Input Link</div><input type='text'></div><i class='delBox'></i>";//<div class='box-handle'><a href='javascript:void(0)' class='delBox'>delete</a></div>", //<a href='javascript:void(0)' class='submitHref'>submit</a>
		    	store_styles = {
		    		position: "absolute",
		    		left: (x/c_width*100).toFixed(2) + "%",
			        top: (y/c_height*100).toFixed(2) + "%",
			        width: (w/c_width*100).toFixed(2) + "%",
			        height: (h/c_height*100).toFixed(2) + "%"
		    	},
		    	styles = {
			        background: "lightblue",
			        opacity: "0.8",
			        zIndex: "10000000"
			    },
			    id = self.box_id_count++;

			$.extend(styles, store_styles);
		    div.attr({
		    	"class": "lzwai-box",
		    	"data-id": id
		    }).css(styles);
		    div.append(delBtn);
		    self.container_ele.append(div);

		    div.draggable({
		    	containment: ".jcrop-holder", 
		    	cursor: "move",
		    	stop: function () {
		    		var new_styles = {
			    		position: "absolute",
			    		left: (parseInt($(this).css("left"))/c_width*100).toFixed(2) + "%",
				        top: (parseInt($(this).css("top"))/c_height*100).toFixed(2) + "%",
				        width: (parseInt($(this).width())/c_width*100).toFixed(2) + "%",
				        height: (parseInt($(this).height())/c_height*100).toFixed(2) + "%"
			    	},
			    	id = $(this).attr("data-id");
			    	self.data_styles[id] = {};
		    		self.data_styles[id]["style"] = new_styles;
		    		self.appendCode();
		    	}
		    });

		    self.data_styles[id] = {};
		    self.data_styles[id]["style"] = store_styles;
		},

		appendCode : function () {
			var self = this;

			var code = generateCode.getCode(self.data_styles);
		    var snippet = $('.code-html code');
		    snippet.get(0).innerHTML = code;
		    hljs.highlightBlock(snippet.get(0));

		    $(".lzwai-code-container").css({
		    	height: "auto"
		    })
		},
		
		bindEvent : function(container_class) {
			var self = this;
		    $(body)
		        .delegate(".lzwai-box input", "blur", function() {
		        	var val = $(this).val();
		        	if (val == "") {
		        		return;
		        	}

		        	var id = $(this).parent().parent().attr("data-id");
		        	self.data_styles[id]["href"] = val;

		        	self.appendCode();
		        	return false;
		        })
		        .delegate(".lzwai-box .delBox", "click", function () {
		        	var boxCon =  $(this).parent(),
		        		id = boxCon.attr("data-id");

		        	boxCon.remove();
		        	self.data_styles[id] = null;

		        	self.appendCode();
		        	return false;
		        })
		        .delegate(".lzwai-show-box", "click", function () {
		        	var lzwaiBox = $(this).parent(),
		        		boxHeight = parseInt(lzwaiBox.height()),
		        		boxTop = parseInt(lzwaiBox.css("top"));
		        	if (boxHeight == 0){
		        		return;
		        	}
		        	
		        	var dir = (boxTop == 0 ? -1 : 0);
		        	
		        	lzwaiBox.animate({
		        		top: dir * boxHeight
		        	}, 1000);
		        });
		},

		cloneContainer : function () {
			var self = this;
			var clone_container = $("<div></div>");
			clone_container
			    .attr("class", "lzwai_container")
			    .css({
			        position: "absolute",
			        left: self.container_ele.offset().left + "px",
			        top: self.container_ele.offset().top + "px",
			        width: self.container_ele.width() + "px",
			        height: self.container_ele.height() + "px"
			    });
			$(body)
			    .css("position", "relative")
			    .append(clone_container);
		},

		initJcrop: function () {
			var self = this;

			$('.lzwai_container').Jcrop({
			    onSelect: self.showCoords,
			    onRelease: function () {
			    	if (repeated) {
			    		self.countData();
			    		self.appendCode();
			    		repeated = false;
			    	}

			    }
			}, function() {
			    $(".jcrop-holder").css({
			        position: "absolute",
			        left: self.container_ele.offset().left + "px",
			        top: self.container_ele.offset().top + "px",
			        width: self.container_ele.width() + "px",
			        height: self.container_ele.height() + "px",
			        background: "rgba(0,0,0,0.2)"
			    });
			});
		},

		dealContainerStyle: function (className) {
			var self = this, positionStyle;
			self.container_ele = $("." + className);
			positionStyle = self.container_ele.css("position");
			if (positionStyle == "relative" || positionStyle == "position" || positionStyle == "fixed") {
				return;
			}
			self.container_ele.css("position", "relative");
		},

		readyPlugin : function(className) {
			var self = this;

			self.dealContainerStyle(className);
			self.cloneContainer();
			self.initJcrop();
		},

		init : function(className) {
			generateCode.insertCodeBox();
		    this.readyPlugin(className);
		    this.bindEvent(className);
		}
	}

})();