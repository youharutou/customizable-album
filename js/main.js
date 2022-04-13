(function() {
    var oldSetOption = $.ui.resizable.prototype._setOption;
    $.ui.resizable.prototype._setOption = function(key, value) {
        oldSetOption.apply(this, arguments);
        if (key === "aspectRatio") {
            this._aspectRatio = !!value;
        }
    };
})();
var familyObj = {
				heiti: "黑体",
				xdxwcjbb: "新蒂下午茶基本版",
				xdxwzxxb: "新蒂小丸子小学版",
				mnjdy: "迷你简黛玉"
				},
   defaultObj = {
	            dabiao: {family: "heiti", size: "36px"},
	            zhongbiao: {family: "heiti", size: "24px"},
				xiaobiao: {family: "heiti", size: "18px"},
				neiwen: {family: "heiti", size: "12px"}
				};
$(function(){
function pageinit(){
	var container = $("#conbox .container"), controls = $("#conbox .controls"), imgbox = $("#conbox .imgbox"), _li = $("#conpages > li"), dt = $("#menu dt"), sum = 0;
	var aspect_ratio = 1, lper = Math.round(200 / $(".customize").width() * 100), bg_scale = 200 / 160;
	$(".customize").height($("body").height() - $(".headbox").height() - 16);
	$("#menu").css("width", lper + "%");
	$("#editarea").css("width", 100 - lper - 0.4 + "%");
	for(var i=0;i<container.length;i++){
		_li.eq(i).prepend(container.eq(i).clone());
		if(!(i == 1 || i == container.length - 1)){
			container.eq(i).width($("#editarea").width() * 0.85).height(container.eq(i).width() / (aspect_ratio * 2));
			if(i != 0){
				container.eq(i).prepend("<div class='pages_divide'></div>");
				$(".pages_divide").height(container.eq(i).height()).css("left", container.eq(i).width() / 2);
			}
			var diff = container.eq(i).height() + clearLetter($("#conbox").css("padding-top")) - ($("#editarea").height() - $("#toolbar").height() - $("#pagesbox").outerHeight());
			if(diff > 0 && diff < 20){
				$("#conbox").css("padding-top", "20px");
			}
			else if(diff > 20){
				$("#conbox").css("padding-top", "20px");
				container.eq(i).height($("#editarea").height() - $("#toolbar").height() - $("#pagesbox").outerHeight() - 40).width(container.eq(i).height() * aspect_ratio * 2);
				if(i != 0){
					$(".pages_divide").height(container.eq(i).height()).css("left", container.eq(i).width() / 2);
				}
			}
		}
		else {
			container.eq(i).height(container.eq(0).height()).width(container.eq(i).height() * aspect_ratio);
		}
		$("#conbox .container > img").eq(i).height(container.eq(i).height());
	}
	$(".surface_divide").height(container.height()).css("left", (container.width() - $(".surface_divide").width()) / 2);
	$("#pagesbox").width($("#editarea").width());
	var _container = $("#conpages .container"), _controls = $("#conpages .controls"), _imgbox = $("#conpages .imgbox");
	_container.each(function(i){
		if(i == 1 || i == _container.length - 1){
			_container.eq(i).height(_container.eq(0).height()).width(_container.eq(i).height() * aspect_ratio).data("data",{v_scale: container.eq(i).width() / _container.eq(i).width()});
			_li.eq(i).width(_container.eq(i).width());
			$("i",_li.eq(i)).css("left",(_li.eq(i).outerWidth() - $("i",_li).width()) / 2);
		}
		else {
			_container.eq(i).width(_li.width()).height(_container.eq(i).width() / (aspect_ratio * 2)).data("data",{v_scale: container.eq(i).width() / _container.eq(i).width()});
		}
		$("#conpages .container > img").eq(i).width(_container.eq(i).width());
	});
	$("#conpages").width((_li.eq(0).outerWidth() + 10) * (_li.length - 2) + (_li.eq(1).outerWidth() + 10) * 2);
	$("#conpages .enlarge_bt,#conpages .narrow_bt,#conpages .imghandle,#conpages .controlsline,#conpages .surface_divide").remove();
	for(var i=0;i<controls.length;i++){
		var pWidth = controls.eq(i).parent().width(), pHeight = controls.eq(i).parent().height();
		controls.eq(i).width(pWidth * clearLetter(controls[i].style.width) / 100).height(pHeight * clearLetter(controls[i].style.height) / 100).css({"left": pWidth * clearLetter(controls[i].style.left) / 100,"top": pHeight * clearLetter(controls[i].style.top) / 100});
		imgbox.eq(i).width(controls.eq(i).width()).height(controls.eq(i).height());
		var c_w = controls.eq(i).width(), c_h = controls.eq(i).height(), bg_w = c_h * 0.7 * bg_scale, bg_h = c_w * 0.7 / bg_scale, zoom_prop = _controls.eq(i).parent().data("data").v_scale;
		c_w < c_h ? 
		(controls.eq(i).css("background-size", c_w * 0.7 + "px " + bg_h + "px"),controls.eq(i).css("background-position", c_w * 0.15 + "px " + (c_h - bg_h) / 2 + "px")) : 
		(controls.eq(i).css("background-size", bg_w + "px " + c_h * 0.7 + "px"),controls.eq(i).css("background-position", (c_w - bg_w) / 2 + "px " + c_h * 0.15 + "px"));
		_controls.eq(i).width(c_w / zoom_prop).height(c_h / zoom_prop).css({"left":clearLetter(controls.eq(i).css("left")) / zoom_prop, "top":clearLetter(controls.eq(i).css("top")) / zoom_prop});
		_imgbox.eq(i).width(_controls.eq(i).width()).height(_controls.eq(i).height());
	}
	container.each(function(i){
		if(i > 0){$(this).hide();}
	});
	for(var i=0;i<dt.length;i++){
		sum += dt.eq(i).outerHeight();
	}
	$("#menu dd").height($("#menu").height() - sum - 20);
	$(".palette").append(intocolor());
	$("#editPanel .hidlayer").each(function(){
		if($("li",this).length > 5){
			$(this).height($("li",this).height() * 5);
		}
	});
}
pageinit();
$("#editarea").on("mousedown","#conbox .controls",function(){
	if($(".fontCur").length > 0){
		return;
	}
	else {
		$(this).addClass("controlsCur");
		if($("img",this).length>0){
			$(".imghandle,.enlarge_bt,.narrow_bt",this).show();
		}
		$(".delete").removeClass("d_invalid");
		$(this).css("z-index",100);
		$("#conpages .controls").eq($("#conbox .controls").index(this)).css("z-index",100);
	}
});
$("#editarea").on("mousedown","#conbox .fontCtrl",function(){
	$("#conbox .fontCtrl").removeClass("fontCur");
	$(this).addClass("fontCur");
	$(".copy").removeClass("c_invalid");
	$(".delete").removeClass("d_invalid");
	$("#editPanel").show();
	$("#editPanel .family input").val($(this).data("family"));
	$("#editPanel .size input").val($(this).data("size"));
	$("#editPanel .size").next().find(".blocolor").css("background-color",$(this).data("color"));
});
$("#editPanel i").click(function(){
	$(this).next().css("display")=="none" ? 
	($("#editPanel .hidlayer").hide(),$(".colorpanel").hide(),$(this).next().show()) : $(this).next().hide();
});
$(".palette").click(function(event){
	if($(event.target).closest(".colorpanel").length > 0){
		return;
	}
	else {
		$(".colorpanel",this).css("display")=="none" ? 
		($(".colorpanel").hide(),$("#editPanel .hidlayer").hide(),$(".colorpanel",this).show()) : $(".colorpanel",this).hide();
	}
});
$(".align li").click(function(){
	var fontCur = $(".fontCur"), Orival;
	if($(this).hasClass("bold")){
		Orival = fontCur.css("font-weight");
		(Orival == "normal" || Orival == 400) ? fontCur.css("font-weight","bold") : fontCur.css("font-weight","normal");
	}
	else if($(this).hasClass("left")){
		Orival = fontCur.css("text-align");
		fontCur.css("text-align","left");
	}
	else if($(this).hasClass("center")){
		Orival = fontCur.css("text-align");
		fontCur.css("text-align","center");
	}
	else {
		Orival = fontCur.css("text-align");
		fontCur.css("text-align","right");
	}
	stack.execute(new myCommand18($(this), Orival));
});
$("#toolbar").mousedown(function(event){
	if($("#editPanel").css("display") != "none"){
		var etar1 = $(event.target).is("#editPanel i"), fontCur = $(".fontCur");
		if($(event.target).is("#editPanel .hidlayer li")){
			var text = $(event.target).text(), input = $(event.target).parent().parent().parent().find("input"), inputVal = input.val();
			input.val(text);
			$(event.target).parent().parent().hide();
			if($(event.target).closest(".family").length > 0){
				fontCur.css("font-family",text).data("family", text);
				stack.execute(new myCommand15(input, "font-family", "family", inputVal, text));
			}
			else {
				fontCur.css("font-size",text).data("size", text);
				stack.execute(new myCommand15(input, "font-size", "size", inputVal, text));
			}
		}
		else if($(event.target).is("#editPanel td")){
			var tdcolor = $(event.target).css("background-color"), blocolor = $(".blocolor",$(".palette").has(event.target)), Oricolor = blocolor.css("background-color");
			blocolor.css("background-color",tdcolor);
			$(".colorpanel").hide();
			fontCur.css("color",tdcolor).data("color", tdcolor);
			stack.execute(new myCommand17(blocolor, Oricolor, tdcolor));
		}
		else if(!($(event.target).closest(".hidlayer").length > 0) && !($(event.target).closest(".palette").length > 0) && !etar1){
			$("#editPanel .hidlayer").hide();
			$("#editPanel .colorpanel").hide();
		}
	}
});
$("#conbox").mousedown(function(event){
	if($(".fontCur").length > 0){
		if($(event.target).is(".fontCur")){
			$("#editPanel .hidlayer").hide();
			$("#editPanel .colorpanel").hide();
		}
		else {
			$("#editPanel .hidlayer").hide();
			$("#editPanel .colorpanel").hide();
			$("#conbox .fontCtrl").removeClass("fontCur");
			$("#editPanel").hide();
			$(".delete").addClass("d_invalid");
			$(".copy").addClass("c_invalid");
		}
		return;
	}
	if($(".textbox").length > 0){
		if($(event.target).closest(".textbox").length > 0){
			return;
		}
		else {
			var textbox = $(".textbox"), html = textbox.data("html"), _html;
			textbox.before(textbox.data("fontCtrl"));
			if($("span",textbox).length > 0){
				$("span",textbox).removeAttr("style");
			}
			_html = textbox.html();
			if(!(html.length == _html.length && html == _html)){
				stack.execute(new myCommand13(textbox.prev(), html, _html));
			}
			textbox.prev().addClass("fontCur").html(_html).end().detach();
			$("#editPanel").show();
			$(".delete").removeClass("d_invalid");
			$(".copy").removeClass("c_invalid");
			return;
		}
	}
	var controlsCur = $(".controlsCur");
	if(controlsCur.length > 0){
		$(".enlarge_bt,.narrow_bt,.imghandle",controlsCur).hide();
		$(".delete").addClass("d_invalid");
		$("#conpages .controls").eq($("#conbox .controls").index(controlsCur)).css("z-index",10);
		controlsCur.css("z-index",10).removeClass("controlsCur");
	}
});
$(".container").on("mousedown",".imghandle",function(){
	$(this).parent().parent().css("overflow","visible");
	$(this).css("visibility","hidden");
});
$("#editarea").on("mouseup","#conbox .controls",function(){
	var imghandle=$(".imghandle",this);
	var imgleft=clearLetter($(".imgdrag",this).css("left")), imgtop=clearLetter($(".imgdrag",this).css("top"));
	$(".imgbox",this).css("overflow","hidden");
	imghandle.css({"visibility":"visible","left":($(this).width()-imghandle.width()) / 2 - imgleft,
	"top":($(this).height()-imghandle.height()) / 2 - imgtop});
});
$(".container").on("mouseover",".ui-resizable-se,.ui-resizable-sw,.ui-resizable-ne,.ui-resizable-nw",function(){
	$(this).parent().resizable('option', 'maxWidth', null).resizable('option', 'maxHeight', null).resizable('option', 'aspectRatio', true).data("swi",0);
});
$(".container").on("mouseover",".ui-resizable-e",function(){
	var controls = $(this).parent();
	controls.resizable('option', 'aspectRatio', false).data("swi",1);
	if($("img",controls).length > 0){
		controls.resizable('option', 'maxWidth', $(".imgdrag",controls).width()).resizable('option', 'maxHeight', $(".imgdrag",controls).height());
	}
});
$(".container").on("mouseover",".ui-resizable-s",function(){
	var controls = $(this).parent();
	controls.resizable('option', 'aspectRatio', false).data("swi",2);
	if($("img",controls).length > 0){
		controls.resizable('option', 'maxWidth', $(".imgdrag",controls).width()).resizable('option', 'maxHeight', $(".imgdrag",controls).height());
	}
});
$(".container").on("mouseover",".ui-resizable-w",function(){
	var controls = $(this).parent();
	controls.resizable('option', 'aspectRatio', false).data("swi",3);
	if($("img",controls).length > 0){
		controls.resizable('option', 'maxWidth', $(".imgdrag",controls).width()).resizable('option', 'maxHeight', $(".imgdrag",controls).height());
	}
});
$(".container").on("mouseover",".ui-resizable-n",function(){
	var controls = $(this).parent();
	controls.resizable('option', 'aspectRatio', false).data("swi",4);
	if($("img",controls).length > 0){
		controls.resizable('option', 'maxWidth', $(".imgdrag",controls).width()).resizable('option', 'maxHeight', $(".imgdrag",controls).height());
	}
});
$(".undo,.redo").click(function(){
	if(($(this).hasClass("undo") && !stack.canUndo()) || ($(this).hasClass("redo") && !stack.canRedo())){
		return;
	}
	else {
		var w = $(this).attr("class");
		stack[w]();
		return false;
	}
});
$(".hideused input").click(function(){
	$(this).toggleClass("hideable");
	$(".img_ctn").filter(".used").toggle();
});
});
$(function() {
$("#menu img").draggable({
    helper: "clone",
	zIndex: "200",
	scroll: false,
	addClasses: false
});
$("#conbox .container").droppable({
	accept: ".fonts img,.background img",
	addClasses: false,
	over: function(event,ui){
		ui.helper.css("opacity","0.5");
		if(ui.helper.parent().parent().hasClass("background")){
			ui.helper.width(400);
		}
	},
	out: function(event,ui){
		ui.helper.css("opacity","1.0");
		if(ui.helper.parent().parent().hasClass("background")){
			ui.helper.width(140);
		}
	},
	drop: function(event,ui){
		if(ui.helper.parent().parent().hasClass("fonts")){
			var that;
			$(".controls",this).first().before("<div class='fontCtrl' style='left: "+(ui.offset.left - getLeft(this))+"px; top: "+(ui.offset.top - getTop(this))+"px'>双击添加文字</div>");
			that = $(".controls",this).first().prev();
			that.data("family", familyObj[defaultObj[ui.draggable.attr("class")]["family"]]).data("size", defaultObj[ui.draggable.attr("class")]["size"]).data("color", "rgb(0, 0, 0)").data("fontWeight", "normal").css({"font-family": that.data("family"), "font-size": that.data("size"), "color": that.data("color"), "font-weight": that.data("fontWeight")});
			stack.execute(new myCommand12($(this),that));
			that.draggable({
				containment: "parent",
				scroll: false,
				addClasses: false,
				start: function(event,ui){
					$(this).data("position",{left: $(this).css("left"), top: $(this).css("top")});
				},
				stop: function(event,ui){
					stack.execute(new myCommand1($(this), $(this).data("position").left, $(this).data("position").top));
				}
			});
		}
		else {
			var _container = $("#conpages .container").eq($(this).index());
			stack.execute(new myCommand19($(this), _container, ui.draggable));
		}
	}
});
$(".container").on("dblclick",".fontCtrl",function(){
	$(this).before("<div class='textbox' contentEditable='true'></div>");
	$(".textbox").html($(this).html()).css({"left": $(this).css("left"),"top": $(this).css("top")}).data("fontCtrl",$(this).detach()).data("html", $(this).html());
	$("#editPanel").hide();
	$(".delete").addClass("d_invalid");
	$(".copy").addClass("c_invalid");
});
$("#conbox .imgbox").droppable({
	accept: ".imgsrc img",
	addClasses: false,
	greedy: true,
	over: function(event,ui){
		ui.draggable.data("diff") > 0 ? ui.helper.width(300).css("opacity","0.5") : ui.helper.height(300).css("opacity","0.5");
		$(this).parent().addClass("active");
	},
	out: function(event,ui){
		ui.draggable.data("diff") > 0 ? ui.helper.width(100).css("opacity","1.0") : ui.helper.height(100).css("opacity","1.0");
		$(this).parent().removeClass("active");
	},
	drop: function(event,ui){
		var controls = $(this).parent(), img=$("img",this), imgdrag=$(".imgdrag",this), _imgdrag = $("#conpages .imgdrag").eq($("#conbox .imgbox").index(this)), swi;
		controls.removeClass("active");
		if(img.length>0){
			swi = 1;
			$(this).data("data",{width: imgdrag.width(), height: imgdrag.height()});
			stack.execute(new myCommand2($(this), _imgdrag, ui.draggable, swi, getLeft(controls[0]), getTop(controls[0]), $(this).data("data").width, $(this).data("data").height, img.data("index")));
		}
		else {
			swi = 0;
			stack.execute(new myCommand2($(this), _imgdrag, ui.draggable, swi, getLeft(controls[0]), getTop(controls[0])));
		}
	}
});
$("#conbox .controls").draggable({
	addClasses: false,
	containment: "parent",
	cancel: ".ui-resizable-handle, .imghandle",
	scroll: false,
	start: function(event,ui){
		$(this).data("startpis",{pis1: $(this).css("left"), pis2: $(this).css("top")});
	},
	drag: function(event,ui){
		var _controls = $("#conpages .controls").eq($("#conbox .controls").index(this)), zoom_prop = _controls.parent().data("data").v_scale;
		_controls.css({"left": clearLetter($(this).css("left")) / zoom_prop,"top": clearLetter($(this).css("top")) / zoom_prop});
	},
	stop: function(event,ui){
		var imgdrag=$(".imgdrag",this), zoom_prop = $("#conpages .controls").eq($("#conbox .controls").index(this)).parent().data("data").v_scale;
		imgdrag.draggable('option', 'containment',[getLeft(this)-imgdrag.width()+$(this).width(),getTop(this)-imgdrag.height()+$(this).height(),getLeft(this),getTop(this)]);
		stack.execute(new myCommand1($(this), $(this).data("startpis").pis1, $(this).data("startpis").pis2, zoom_prop));
	}
});
$("#conbox .controls").resizable({
	handles: "all",
	alsoResize: ".ui-resizable-resizing .imgbox",
	containment: "parent",
	start: function(event,ui){
		$(this).data("data",{cwidth: $(this).width(), cheight: $(this).height(), cleft: clearLetter($(this).css("left")), ctop: clearLetter($(this).css("top")), width: $("img",this).width(), height: $("img",this).height(), left: clearLetter($(".imgdrag",this).css("left")), top: clearLetter($(".imgdrag",this).css("top")), handleleft: clearLetter($(".imghandle",this).css("left")), handletop: clearLetter($(".imghandle",this).css("top")), offsetL: getLeft(this), offsetT: getTop(this)});
	},
	resize: function(event,ui){
		var cond, img=$("img",this), imgdrag=$(".imgdrag",this), imghandle=$(".imghandle",this), narrow=$(".narrow_bt",this);
		var _controls=$("#conpages .controls").eq($("#conbox .controls").index(this)), _img=$("img",_controls), _imgbox=$(".imgbox",_controls), _imgdrag=$(".imgdrag",_controls), zoom_prop = _controls.parent().data("data").v_scale;
		var uiWidth = ui.size.width, uiHeight = ui.size.height;
		_controls.width(uiWidth / zoom_prop).height(uiHeight / zoom_prop).css({"left": ui.position.left / zoom_prop,"top": ui.position.top / zoom_prop});
		_imgbox.width(_controls.width()).height(_controls.height());
		if(img.length>0){
			switch($(this).data("swi")){
				case 1:	
					cond = imgdrag.width() - uiWidth + $(this).data("data").left;
					if(!(cond > 0)){
						var diff = uiWidth-imgdrag.width();
						imgdrag.css("left",diff);
						_imgdrag.css("left",diff / zoom_prop);
					}
					if(uiWidth < imgdrag.width() && uiHeight < imgdrag.height()){
						narrow.removeClass("invalid");
					}
					else {
						narrow.addClass("invalid");
					}
					imghandle.css("left",(uiWidth-imghandle.width()) / 2 - clearLetter(imgdrag.css("left")));
					break;
				case 2:	
					cond = imgdrag.height() - uiHeight + $(this).data("data").top;
					if(!(cond > 0)){
						var diff = uiHeight - imgdrag.height();
						imgdrag.css("top",diff);
						_imgdrag.css("top",diff / zoom_prop);
					}
					if(uiWidth < imgdrag.width() && uiHeight < imgdrag.height()){
						narrow.removeClass("invalid");
					}
					else {
						narrow.addClass("invalid");
					}
					imghandle.css("top",(uiHeight-imghandle.height()) / 2 - clearLetter(imgdrag.css("top")));
					break;
				case 3:	
					cond = $(this).data("data").left + uiWidth - ui.originalSize.width;
					if(cond > 0){
						imgdrag.css("left",0);
						_imgdrag.css("left",0);
					}
					else {
						imgdrag.css("left",cond);
						_imgdrag.css("left",cond / zoom_prop);
					}
					if(uiWidth < imgdrag.width() && uiHeight < imgdrag.height()){
						narrow.removeClass("invalid");
					}
					else {
						narrow.addClass("invalid");
					}
					imghandle.css("left",(uiWidth-imghandle.width()) / 2 - clearLetter(imgdrag.css("left")));
					break;
				case 4:	
					cond = $(this).data("data").top + uiHeight - ui.originalSize.height;
					if(cond > 0){
						imgdrag.css("top",0);
						_imgdrag.css("top",0);
					}
					else {
						imgdrag.css("top",cond);
						_imgdrag.css("top",cond / zoom_prop);
					}
					if(uiWidth < imgdrag.width() && uiHeight < imgdrag.height()){
						narrow.removeClass("invalid");
					}
					else {
						narrow.addClass("invalid");
					}
					imghandle.css("top",(uiHeight - imghandle.height()) / 2 - clearLetter(imgdrag.css("top")));
					break;
				default:
					var scale_w=ui.originalSize.width / $(this).data("data").width, scale_h=ui.originalSize.height / $(this).data("data").height, scale_l=$(this).data("data").left / $(this).data("data").cwidth, scale_t=$(this).data("data").top / $(this).data("data").cwidth;
					var imgLeft = uiWidth * scale_l, imgTop = uiWidth * scale_t;
					($(this).data("compare").conScale < $(this).data("compare").imgScale) ?
					(img.height(uiHeight / scale_h),_img.height(img.height() / zoom_prop)) : 
					(img.width(uiWidth / scale_w),_img.width(img.width() / zoom_prop));
					imgdrag.width(img.width()).height(img.height()).css({"left": imgLeft,"top": imgTop});
					_imgdrag.width(_img.width()).height(_img.height()).css({"left": imgLeft / zoom_prop,"top": imgTop / zoom_prop});
					imghandle.css({"left":(uiWidth-imghandle.width()) / 2 - imgLeft,"top":(uiHeight-imghandle.height()) / 2 - imgTop});
					break;
			}
	    }
	},
	stop: function(event,ui){
		var zoom_prop = $("#conpages .controls").eq($("#conbox .controls").index(this)).parent().data("data").v_scale;
		if($("img",this).length>0){
			var imgdrag=$(".imgdrag",this);
			$(this).data("data1",{width1: $("img",this).width(), height1: $("img",this).height(), offsetL1: getLeft(this), offsetT1: getTop(this)});
			imgdrag.draggable('option', 'containment',[getLeft(this)-imgdrag.width()+$(this).width(),getTop(this)-imgdrag.height()+$(this).height(),getLeft(this),getTop(this)]);
			$(this).resizable('option', 'maxWidth', imgdrag.width()).resizable('option', 'maxHeight', imgdrag.height());
		}
		stack.execute(new myCommand5($(this), $(this).data("data").cwidth, $(this).data("data").cheight, $(this).data("data").cleft, $(this).data("data").ctop, $(this).data("data").width, $(this).data("data").height, $(this).data("data1").width1, $(this).data("data1").height1, $(this).data("data").left, $(this).data("data").top, $(this).data("data").handleleft, $(this).data("data").handletop, $(this).data("data").offsetL, $(this).data("data").offsetT, $(this).data("data1").offsetL1, $(this).data("data1").offsetT1, zoom_prop));
	}
});
$("#conbox .imgdrag").draggable({
	handle: ".imghandle",
	cursor: "all-scroll",
	addClasses: false,
	start: function(event,ui){
		$(this).data("startpis",{pis1: $(this).css("left"), pis2: $(this).css("top")});
	},
	drag: function(event,ui){
		_imgdrag = $("#conpages .imgdrag").eq($("#conbox .imgdrag").index(this)), zoom_prop = _imgdrag.parent().parent().parent().data("data").v_scale;
		_imgdrag.css({"left": clearLetter($(this).css("left")) / zoom_prop,"top": clearLetter($(this).css("top")) / zoom_prop});
	},
	stop: function(event,ui){
		stack.execute(new myCommand1($(this), $(this).data("startpis").pis1, $(this).data("startpis").pis2, zoom_prop));
	}
});
$(".container").on("click",".enlarge_bt,.narrow_bt",function(){
	var controls = $(this).parent().parent(), imgdrag = $(".imgdrag",controls), img = $("img",controls);
	var _imgdrag=$("#conpages .imgdrag").eq($("#conbox .imgdrag").index(imgdrag)), _img=$("img",_imgdrag);
	if($(this).hasClass("enlarge_bt")){
		stack.execute(new myCommand3($(this).parent(), img.width(), img.height(), clearLetter(imgdrag.css("left")), clearLetter(imgdrag.css("top")), _img.width(), _img.height(), clearLetter(_imgdrag.css("left")), clearLetter(_imgdrag.css("top")), getLeft(controls[0]), getTop(controls[0])));
	}
	else {
		if($(this).hasClass("invalid")){
			return;
		}
		else {
			stack.execute(new myCommand4($(this).parent(), img.width(), img.height(), clearLetter(imgdrag.css("left")), clearLetter(imgdrag.css("top")), _img.width(), _img.height(), clearLetter(_imgdrag.css("left")), clearLetter(_imgdrag.css("top")), getLeft(controls[0]), getTop(controls[0])));
		}
	}
});
var swfu = new SWFUpload({
	upload_url: "upload.php",
	flash_url: "SWFUpload/swfupload_fp10/swfupload.swf",
	file_types: "*.jpg;*.gif;*.png",
	file_types_description: "All Image Files",
	file_size_limit: 0,
	file_upload_limit: 0,
	file_queue_limit: 0,
	button_placeholder_id: "uploadbutton",
	button_image_url: "images/upload_btn.png",
	button_width: 120,
	button_height: 30,
	button_cursor: SWFUpload.CURSOR.HAND,
	button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
	file_dialog_complete_handler: fileDialogComplete,
	upload_start_handler: uploadStart,
	upload_progress_handler: uploadProgress,
	upload_success_handler: uploadSuccess,
	upload_error_handler: uploadError,
	upload_complete_handler: uploadComplete
});
function fileDialogComplete(num_s,num_q){
	if(num_q > 0){
		this.startUpload();
	}
}
function uploadStart(file){
	$(".imgsrc .ct_box").append("<div class='uploadbox'><div class='upload_progress'><span></span></div></div>");
}
function uploadProgress(file,bytesLoaded,bytesTotal){
	var perc = parseInt(bytesLoaded / bytesTotal * 100);
	$(".upload_progress span").css("width", perc+"%");
}
function uploadSuccess(file,data){
	$(".uploadbox").remove();
	$(".imgsrc .ct_box").append("<div class='img_ctn'><img src='"+data+"' /></div>");
	var img = $(".imgsrc img").last();
	img.load(function(){
		img.data("diff", img.width() - img.height());
		img.data("diff") > 0 ? img.width(80) : img.height(80);
	});
	img.draggable({
		helper: "clone",
		zIndex: "200",
		scroll: false,
		addClasses: false
	});
}
function uploadComplete(file){
	this.startUpload();
}
function uploadError(file,code,msg){
	$(".uploadbox").remove();
	alert("上传失败!"+msg);
}
$(".add").click(function(){
	var container=$("#conbox .container:visible"), _container=$("#conpages .container").eq($("#conbox .container").index(container));
	var str="<div class='controls'><div class='imgbox'><div class='imgdrag'><div class='imghandle' style='display: none;'></div></div><div class='enlarge_bt' style='display: none;'></div><div class='narrow_bt invalid' style='display: none;'></div></div><div class='controlsline controlstop'></div><div class='controlsline controlsright'></div><div class='controlsline controlsbottom'></div><div class='controlsline controlsleft'></div></div>";
	stack.execute(new myCommand7(str,container,_container));
});
$(".delete").click(function(){
	if($(this).hasClass("d_invalid")){
		return;
	}
	else {
		if($(".fontCur").length > 0){
			var fontCur = $(".fontCur");
			stack.execute(new myCommand6(fontCur));
		}
		else {
			var controls=$(".controlsCur"), _controls=$("#conpages .controls").eq($("#conbox .controls").index(controls));
			stack.execute(new myCommand6(controls,_controls));
		}
	}
});
$(".copy").click(function(){
	if($(this).hasClass("c_invalid")){
		return;
	}
	else {
		var fontCur = $(".fontCur"), left, top;
		left = clearLetter(fontCur.css("left")) + 30;
		top = clearLetter(fontCur.css("top")) + fontCur.outerHeight();
		fontCur.clone().insertAfter(fontCur).css({"left": left,"top": top}).data("family", fontCur.data("family")).data("size", fontCur.data("size")).data("color", fontCur.data("color")).data("fontWeight", fontCur.data("fontWeight")).trigger("mousedown").draggable({
			containment: "parent",
			scroll: false,
			addClasses: false,
			start: function(event,ui){
				$(this).data("position",{left: $(this).css("left"), top: $(this).css("top")});
			},
			stop: function(event,ui){
				stack.execute(new myCommand1($(this), $(this).data("position").left, $(this).data("position").top));
			}
		});
		stack.execute(new myCommand14(fontCur));
	}
});
$(".preview").click(function(event){
	$("body").append("<div class='underlayer'></div><div class='pre-win'><div class='hd'><i class='close'></i></div><div class='bd'><div id='bb-bookblock' class='bb-bookblock'><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div><div class='bb-item'></div></div></div><div class='ft'><i id='bb-nav-prev'></i><div id='bb-nav-jump'><div class='curpage'>封面</div><ul style='display:none'></ul></div><i id='bb-nav-next'></i></div></div>");
	$(".bb-item").each(function(i){
		if(i < $(".bb-item").length - 1){
			$(this).append($("#conbox .container").eq(i).html());
			if(i == 0){
				$(this).append("<div class='top_mask'></div>");
				$("#bb-nav-jump ul").append("<li class='selected'>封面</li>");
			}
			else {
				$("#bb-nav-jump ul").append("<li>第"+(i*2-1)+","+i*2+"页</li>");
			}
		}
		if(i == $(".bb-item").length - 1){
			$("#bb-nav-jump ul").append("<li>封底</li>");
		}
	});
	var fontCtrl = $("#conbox .fontCtrl"), $li = $("#bb-nav-jump li"), container = $("#conbox .container:visible");
	var bodyWidth = $("body").outerWidth(), aspect_ratio = 1, zoom, diff;
	$(".underlayer").width(bodyWidth).height($("body").outerHeight());
	$("#bb-bookblock").width(Math.round(bodyWidth * 0.45)).height(Math.round($("#bb-bookblock").width() / (aspect_ratio * 2)));
	$(".top_mask").width($("#bb-bookblock").width() * 0.5).height($("#bb-bookblock").height());
	$(".bottom_mask").width($("#bb-bookblock").width() * 0.5).height($("#bb-bookblock").height());
	$(".pre-win").width(bodyWidth * 0.5).css({"left": (bodyWidth - $(".pre-win").outerWidth()) / 2,"top": ($("body").outerHeight() - $(".pre-win").outerHeight()) / 2});
	if($li.length > 5){
		$li.parent().height($li.height() * 5);
	}
	diff = $li.parent().height() - clearLetter($(".pre-win").css("top")) - 10;
	if(diff > 0){
		$(".pre-win").css("top", clearLetter($(".pre-win").css("top")) - diff);
	}
	zoom = {
		controls: $("#conbox .controls"),
		imgdrag: $("#conbox .imgdrag"),
		bbImg: $(".bb-item > img"),
		bbControls: $(".bb-item .controls"),
		bbImgbox: $(".bb-item .imgbox"),
		bbImgdrag: $(".bb-item .imgdrag"),
		scale: $("#bb-bookblock").width() / $("#conbox .container").width()
	};
	zoom.bbImg.width($("#bb-bookblock").width()).height($("#bb-bookblock").height());
	$("#conbox .container").show();
	for(var i=0;i<zoom.controls.length;i++){
		zoom.bbControls.eq(i).width(Math.round(zoom.controls.eq(i).width() * zoom.scale)).height(Math.round(zoom.controls.eq(i).height() * zoom.scale)).css({"left": Math.round(clearLetter(zoom.controls.eq(i).css("left")) * zoom.scale),"top": Math.round(clearLetter(zoom.controls.eq(i).css("top")) * zoom.scale)});
		zoom.bbImgbox.eq(i).width(zoom.bbControls.eq(i).width()).height(zoom.bbControls.eq(i).height());
		if($("img",zoom.imgdrag[i]).length > 0){
			(zoom.controls.eq(i).data("compare").conScale < zoom.controls.eq(i).data("compare").imgScale) ? 
			$("img",zoom.bbImgdrag[i]).height(Math.round($("img",zoom.imgdrag[i]).height() * zoom.scale)) : 
			$("img",zoom.bbImgdrag[i]).width(Math.round($("img",zoom.imgdrag[i]).width() * zoom.scale));
			zoom.bbImgdrag.eq(i).width($("img",zoom.bbImgdrag[i]).width()).height($("img",zoom.bbImgdrag[i]).height()).css({"left": Math.round(clearLetter(zoom.imgdrag.eq(i).css("left")) * zoom.scale),"top": Math.round(clearLetter(zoom.imgdrag.eq(i).css("top")) * zoom.scale)});
		}
	}
	$("#conbox .container").hide();
	container.show();
	for(var i=0;i<fontCtrl.length;i++){
		$("#bb-bookblock .fontCtrl").eq(i).css({"font-size": Math.round(clearLetter(fontCtrl.eq(i).data("size")) * zoom.scale) + "px", "line-height": Math.round(clearLetter(fontCtrl.eq(i).data("lineHeight")) * zoom.scale) + "px", "left": Math.round(clearLetter(fontCtrl.eq(i).css("left")) * zoom.scale), "top": Math.round(clearLetter(fontCtrl.eq(i).css("top")) * zoom.scale)});
	}
	$(".bb-item").last().html($(".bb-item").first().html()).children().last().removeClass().addClass("bottom_mask");
	$("#bb-bookblock .enlarge_bt,#bb-bookblock .narrow_bt,#bb-bookblock .imghandle,#bb-bookblock .controlsline,#bb-bookblock .ui-resizable-handle,#bb-bookblock .surface_divide,#bb-bookblock .pages_divide").remove();
	$(".pre-win").append("<script type='text/javascript' src='js/bbinit.js'></scri"+"pt>");
	event.stopPropagation();
});
$(".save").click(function(){
	var container = $("#conbox .container"), dstUrl=[], srcUrl=[], control=[], imgPos=[], fontInfo=[], path = "fonts/";
	var newimg = new Image(), firstImg = $("img",container[0]).first(), saveScale;
	newimg.src = firstImg.attr("src");
	saveScale = newimg.height / firstImg.height();
	for(var i=0;i<container.length;i++){
		var controls = $(".controls",container[i]), imgdrag = $(".imgdrag",container[i]), fontCtrl = $(".fontCtrl",container[i]);
		var cWidth = container.eq(i).width(), cHeight = container.eq(i).height();
		srcUrl[i]=[];
		control[i]=[];
		imgPos[i]=[];
		fontInfo[i]=[];
		dstUrl[i] = $("img",container[i]).first().attr("src");
		for(var j=0;j<controls.length;j++){
			if($("img",controls[j]).length > 0){
				srcUrl[i][j]=$("img",controls[j]).attr("src");
			}
			else {
				srcUrl[i][j]="undefined";
			}
			control[i][j]={"width":Math.round(controls.eq(j).width() * saveScale),"height":Math.round(controls.eq(j).height() * saveScale),"left":Math.round(clearLetter(controls.eq(j).css("left")) * saveScale),"top":Math.round(clearLetter(controls.eq(j).css("top")) * saveScale)};
			imgPos[i][j]={"width":Math.round(imgdrag.eq(j).width() * saveScale),"height":Math.round(imgdrag.eq(j).height() * saveScale),"left":-Math.round(clearLetter(imgdrag.eq(j).css("left")) * saveScale),"top":-Math.round(clearLetter(imgdrag.eq(j).css("top")) * saveScale)};
		}
		if(fontCtrl.length > 0){
			for(var k=0;k<fontCtrl.length;k++){
				fontInfo[i][k] = {"size": Math.round(clearLetter(fontCtrl.eq(k).data("size")) * saveScale), "color": fontCtrl.eq(k).data("color").match(/\d+/g), "left": Math.round(clearLetter(fontCtrl.eq(k).css("left")) * saveScale), "top": Math.round(clearLetter(fontCtrl.eq(k).css("top")) * saveScale) + Math.round(clearLetter(fontCtrl.eq(k).data("size")) * saveScale)};
				for(name in familyObj){
					if(familyObj[name] == fontCtrl.eq(k).data("family")){
						fontInfo[i][k].file = path+name+".ttf";
					}
				}
			}
			if(Sys.ie){
				for(var k=0;k<fontCtrl.length;k++){
					var str = fontCtrl.eq(k).html(), reg = /\s/g;
					if(reg.test(str)){
						str = str.replace(reg,"");
					}
					str = str.replace(/<p>/i,"");
					str = str.replace(/<\/p>/ig,"");
					fontInfo[i][k].text = str.split(/<p>/i);
				}
			}
			else if(Sys.firefox){
				for(var k=0;k<fontCtrl.length;k++){
					fontInfo[i][k].text = fontCtrl.eq(k).html().split("<br>");
				}
			}
			else {
				for(var k=0;k<fontCtrl.length;k++){
					var str = fontCtrl.eq(k).html().replace(/<\/div>/g,"");
					fontInfo[i][k].text = str.split("<div>");
				}
			}
		}
	}
	$.ajax({url: "test.php", type: "POST", data: {dst_url:$.toJSON(dstUrl),src_url:$.toJSON(srcUrl),con_info:$.toJSON(control),img_pos:$.toJSON(imgPos),font_info:$.toJSON(fontInfo)}, success:function(data){alert("OK!");}});
});
$(document).keydown(function(e){
	var controls=$(".controlsCur"), _controls=$("#conpages .controls").eq($("#conbox .controls").index(controls)), imgdrag=$(".imgdrag",controls);
	var fontCur = $("#conbox .fontCur");
	if(controls.length > 0){
		var conleft = clearLetter(controls.css("left")), contop = clearLetter(controls.css("top"));
	}
	if(fontCur.length > 0){
		var fontleft = clearLetter(fontCur.css("left")), fonttop = clearLetter(fontCur.css("top"));
	}
	if((e.ctrlKey && e.keyCode==90) || (e.metaKey && e.keyCode==90)){
		$(".undo").trigger("click");
		return false;
	}
	else if((e.ctrlKey && e.keyCode==89) || (e.metaKey && e.keyCode==89)){
		$(".redo").trigger("click");
		return false;
	}
	else if((e.ctrlKey && e.keyCode==67) || (e.metaKey && e.keyCode==67)){
		$(".copy").trigger("click");
		return false;
	}
	else if(e.keyCode==37){
		if(controls.length > 0 && conleft > 0){
			stack.execute(new myCommand8(controls, conleft, _controls, imgdrag));
			return false;
		}
		if(fontCur.length > 0 && fontleft > 0){
			stack.execute(new myCommand8(fontCur, fontleft));
			return false;
		}
	}
	else if(e.keyCode==39){
		if(controls.length > 0 && conleft < (controls.parent().width()-controls.width())){
			stack.execute(new myCommand9(controls, conleft, _controls, imgdrag));
			return false;
		}
		if(fontCur.length > 0 && fontleft < (fontCur.parent().width()-fontCur.width())){
			stack.execute(new myCommand9(fontCur, fontleft));
			return false;
		}
	}
	else if(e.keyCode==38){
		if(controls.length > 0 && contop > 0){
			stack.execute(new myCommand10(controls, contop, _controls, imgdrag));
			return false;
		}
		if(fontCur.length > 0 && fonttop > 0){
			stack.execute(new myCommand10(fontCur, fonttop));
			return false;
		}
	}
	else if(e.keyCode==40){
		if(controls.length > 0 && contop < (controls.parent().height()-controls.height())){
			stack.execute(new myCommand11(controls, contop, _controls, imgdrag));
			return false;
		}
		if(fontCur.length > 0 && fonttop < (fontCur.parent().height()-fontCur.height())){
			stack.execute(new myCommand11(fontCur, fonttop));
			return false;
		}
	}
});
});