	var stack = new Undo.Stack(),
    myCommand1 = Undo.Command.extend({
		constructor: function(ele,p1,p2,prop,p3,p4){
			this.ele = ele;
			this.p1 = p1;
			this.p2 = p2;
			this.p3 = p3;
			this.p4 = p4;
			this.prop = prop;
		},
		execute: function(){
			
		},
		undo: function(){
			this.p3=this.ele.css("left");
			this.p4=this.ele.css("top");
			this.ele.css({"left":this.p1,"top":this.p2});
			if(this.ele.hasClass("controls")){
				var imgdrag=$(".imgdrag",this.ele);
				$("#conpages .controls").eq($("#conbox .controls").index(this.ele)).css({"left": clearLetter(this.p1) / this.prop,"top": clearLetter(this.p2) / this.prop});
				imgdrag.draggable('option', 'containment',[getLeft(this.ele[0])-imgdrag.width()+this.ele.width(),getTop(this.ele[0])-imgdrag.height()+this.ele.height(),getLeft(this.ele[0]),getTop(this.ele[0])]);
			}
			else if(this.ele.hasClass("imgdrag")){
				var imghandle=$(".imghandle",this.ele);
				$("#conpages .imgdrag").eq($("#conbox .imgdrag").index(this.ele)).css({"left": clearLetter(this.p1) / this.prop,"top": clearLetter(this.p2) / this.prop});
				imghandle.css({"left":(this.ele.parent().width()-imghandle.width()) / 2 - clearLetter(this.p1),
		"top":(this.ele.parent().height()-imghandle.height()) / 2 - clearLetter(this.p2)});
			}
		},
		redo: function(){
			this.ele.css({"left":this.p3,"top":this.p4});
			if(this.ele.hasClass("controls")){
				var imgdrag=$(".imgdrag",this.ele);
				$("#conpages .controls").eq($("#conbox .controls").index(this.ele)).css({"left": clearLetter(this.p3) / this.prop,"top": clearLetter(this.p4) / this.prop});
				imgdrag.draggable('option', 'containment',[getLeft(this.ele[0])-imgdrag.width()+this.ele.width(),getTop(this.ele[0])-imgdrag.height()+this.ele.height(),getLeft(this.ele[0]),getTop(this.ele[0])]);
			}
			else if(this.ele.hasClass("imgdrag")){
				var imghandle=$(".imghandle",this.ele);
				$("#conpages .imgdrag").eq($("#conbox .imgdrag").index(this.ele)).css({"left": clearLetter(this.p3) / this.prop,"top": clearLetter(this.p4) / this.prop});
				imghandle.css({"left":(this.ele.parent().width()-imghandle.width()) / 2 - clearLetter(this.p3),
		"top":(this.ele.parent().height()-imghandle.height()) / 2 - clearLetter(this.p4)});
			}
		}
	});
    myCommand2 = Undo.Command.extend({
		constructor: function(ele,_imgdrag,drag,swi,offsetL,offsetT,width,height,idx,bak1,bak2,left,top,handleleft,handletop,prop,imgWidth,imgHeight,_imgWidth,_imgHeight){
			this.ele = ele;
			this._imgdrag = _imgdrag;
			this.drag = drag;
			this.swi = swi;
			this.offsetL = offsetL;
			this.offsetT = offsetT;
			this.width = width;
			this.height = height;
			this.idx = idx;
			this.bak1 = bak1;
			this.bak2 = bak2;
			this.left = left;
			this.top = top;
			this.handleleft = handleleft;
			this.handletop = handletop;
			this.prop = prop;
			this.imgWidth = imgWidth;
			this.imgHeight = imgHeight;
			this._imgWidth = _imgWidth;
			this._imgHeight = _imgHeight;
		},
		execute: function(){
			this.ele.parent().data("compare",{conScale: this.ele.width() / this.ele.height(),imgScale: this.drag.width() / this.drag.height()});
			this.prop = this._imgdrag.parent().parent().parent().data("data").v_scale;
			var imgdrag = $(".imgdrag",this.ele), imghandle = $(".imghandle",this.ele);
			if(this.swi==0){
				this.ele.parent().css({"background-color": "transparent","background-image": "none"});
				this._imgdrag.parent().parent().css("background-color","transparent");
				if(this.ele.parent().hasClass("controlsCur")){
					$(".narrow_bt,.enlarge_bt",this.ele).show();
					imghandle.show();
				}
			}
			if(this.swi==1){
				this.left = clearLetter(imgdrag.css("left"));
				this.top = clearLetter(imgdrag.css("top"));
				this.handleleft = imghandle.css("left");
				this.handletop = imghandle.css("top");
				this.bak1 = $("img",this.ele).detach();
				this.bak2 = $("img",this._imgdrag).detach();
			}
			if(this.ele.parent().data("compare").conScale < this.ele.parent().data("compare").imgScale){
				this.imgHeight = this.ele.height();
				this.imgWidth = this.ele.height() * this.ele.parent().data("compare").imgScale;
				this._imgHeight = this.imgHeight / this.prop;
				this._imgWidth = this.imgWidth / this.prop;
				this.drag.clone().height(this.imgHeight).width("auto").appendTo(imgdrag);
				this.drag.clone().height(this._imgHeight).width("auto").appendTo(this._imgdrag);
				imgdrag.width(this.imgWidth).height(this.imgHeight).css({"left": (this.ele.width() - this.imgWidth) / 2,"top": 0});
				this._imgdrag.width(this._imgWidth).height(this._imgHeight).css({"left": (this._imgdrag.parent().width() - this._imgWidth) / 2,"top": 0});
			}
			else {
				this.imgWidth = this.ele.width();
				this.imgHeight = this.ele.width() / this.ele.parent().data("compare").imgScale;
				this._imgWidth = this.imgWidth / this.prop;
				this._imgHeight = this.imgHeight / this.prop;
				this.drag.clone().width(this.imgWidth).height("auto").appendTo(imgdrag);
				this.drag.clone().width(this._imgWidth).height("auto").appendTo(this._imgdrag);
				imgdrag.width(this.imgWidth).height(this.imgHeight).css({"left": 0,"top": (this.ele.height() - this.imgHeight) / 2});
				this._imgdrag.width(this._imgWidth).height(this._imgHeight).css({"left": 0,"top": (this._imgdrag.parent().height() - this._imgHeight) / 2});
			}
			$(".narrow_bt",this.ele).addClass("invalid");
			$("img",this.ele).data("index", this.drag.parent().index());
			this.drag.parent().addClass("used");
			if($(".hideused input").hasClass("hideable")){
				this.drag.parent().hide();
			}
			if(this.swi==1){
				var count = 0, self_idx = this.idx;
				$("#conbox .imgdrag img").each(function(i){
					$(this).data("index") == self_idx ? count+=1 : count+=0;
				});
				if(count == 0){
					$(".img_ctn").eq(this.idx).removeClass("used").show();
				}
			}
			imghandle.css({"left":(this.imgWidth-imghandle.width()) / 2,"top":(this.imgHeight-imghandle.height()) / 2});
			imgdrag.draggable('option', 'containment',[this.offsetL-this.imgWidth+this.ele.width(),this.offsetT-this.imgHeight+this.ele.height(),this.offsetL,this.offsetT]);
			this.ele.parent().resizable('option', 'maxWidth', this.imgWidth).resizable('option', 'maxHeight', this.imgHeight);
		},
		undo: function(){
			var imgdrag=$(".imgdrag",this.ele), imghandle=$(".imghandle",this.ele), self_idx = $("img",this.ele).data("index"), count = 0;
			$("img",this.ele).remove();
			$("img",this._imgdrag).remove();
			if(this.swi==0){
				this.ele.parent().css("background-color","#bbb");
				this._imgdrag.parent().parent().css("background-color","#bbb");
				imghandle.hide();
				this.ele.find(".enlarge_bt,.narrow_bt").hide();
				this.ele.parent().resizable('option', 'maxWidth', null).resizable('option', 'maxHeight', null);
			}
			else {
				if(this.ele.width() < this.width && this.ele.height() < this.height){
					$(".narrow_bt",this.ele).removeClass("invalid");
				}
				imgdrag.append(this.bak1);
				this._imgdrag.append(this.bak2);
				imgdrag.width(this.width).height(this.height).css({"left": this.left,"top": this.top}).draggable('option', 'containment',[this.offsetL-this.width+this.ele.width(),this.offsetT-this.height+this.ele.height(),this.offsetL,this.offsetT]);
				this._imgdrag.width(this.width / this.prop).height(this.height / this.prop).css({"left": this.left / this.prop,"top": this.top / this.prop});
				imghandle.css({"left": this.handleleft,"top": this.handletop});
				this.ele.parent().data("compare",{conScale: this.ele.width() / this.ele.height(),imgScale: this.width / this.height}).resizable('option', 'maxWidth', this.width).resizable('option', 'maxHeight', this.height);
				$(".img_ctn").eq(this.idx).addClass("used");
				if($(".hideused input").hasClass("hideable")){
					$(".img_ctn").eq(this.idx).hide();
				}
			}
			$("#conbox .imgdrag img").each(function(i){
				$(this).data("index") == self_idx ? count+=1 : count+=0;
			});
			if(count == 0){
				$(".img_ctn").eq(self_idx).removeClass("used").show();
			}
		},
		redo: this.execute
	});
    myCommand3 = Undo.Command.extend({
		constructor: function(ele,width,height,left,top,_width,_height,_left,_top,offsetL,offsetT,prop){
			this.ele = ele;
			this.width = width;
			this.height = height;
			this.left = left;
			this.top = top;
			this._width = _width;
			this._height = _height;
			this._left = _left;
			this._top = _top;
			this.offsetL = offsetL;
			this.offsetT = offsetT;
			this.prop = prop;
		},
		execute: function(){
			var img=$("img",this.ele), imgdrag=$(".imgdrag",this.ele), imghandle=$(".imghandle",this.ele);
			var _imgdrag=$("#conpages .imgdrag").eq($("#conbox .imgdrag").index(imgdrag)), _img=$("img",_imgdrag);
			var enlRate=1.2;
			this.prop = _imgdrag.parent().parent().parent().data("data").v_scale;
			$(".narrow_bt",this.ele).removeClass("invalid");
			if(this.ele.parent().data("compare").conScale < this.ele.parent().data("compare").imgScale){
				img.height(this.height * enlRate);
				_img.height(img.height() / this.prop);
			}
			else {
				img.width(this.width * enlRate);
				_img.width(img.width() / this.prop);
			}
			imgdrag.css({"left":this.left - this.width * (enlRate - 1) / 2,"top":this.top - this.height * (enlRate - 1) / 2}).width(this.width * enlRate).height(this.height * enlRate).draggable('option', 'containment',[this.offsetL-imgdrag.width()+this.ele.width(),this.offsetT-imgdrag.height()+this.ele.height(),this.offsetL,this.offsetT]);
			_imgdrag.width(imgdrag.width() / this.prop).height(imgdrag.height() / this.prop).css({"left": clearLetter(imgdrag.css("left")) / this.prop,"top": clearLetter(imgdrag.css("top")) / this.prop});
			imghandle.css({"left":(this.ele.width()-imghandle.width()) / 2 - clearLetter(imgdrag.css("left")),
	        "top":(this.ele.height()-imghandle.height()) / 2 - clearLetter(imgdrag.css("top"))});
		},
		undo: function(){
			var img=$("img",this.ele), imgdrag=$(".imgdrag",this.ele), imghandle=$(".imghandle",this.ele);
			var _imgdrag=$("#conpages .imgdrag").eq($("#conbox .imgdrag").index(imgdrag)), _img=$("img",_imgdrag);
			var enlRate=1.2;
			if(this.ele.parent().data("compare").conScale < this.ele.parent().data("compare").imgScale){
				img.height(this.height);
				_img.height(this._height);
			}
			else {
				img.width(this.width);
				_img.width(this._width);
			}
			if((Math.abs(this.width - this.ele.width()) < 2) || (Math.abs(this.height - this.ele.height()) < 2)){
				$(".narrow_bt",this.ele).addClass("invalid");
			}
			imgdrag.css({"left":this.left,"top":this.top}).width(this.width).height(this.height).draggable('option', 'containment',[this.offsetL-this.width+this.ele.width(),this.offsetT-this.height+this.ele.height(),this.offsetL,this.offsetT]);
			_imgdrag.width(this._width).height(this._height).css({"left": this._left,"top": this._top});
			imghandle.css({"left":(this.ele.width()-imghandle.width()) / 2 - this.left,
	        "top":(this.ele.height()-imghandle.height()) / 2 - this.top});
		},
		redo: this.execute
	});
    myCommand4 = Undo.Command.extend({
		constructor: function(ele,width,height,left,top,_width,_height,_left,_top,offsetL,offsetT,prop,imgWidth,imgHeight,_imgWidth,_imgHeight){
			this.ele = ele;
			this.width = width;
			this.height = height;
			this.left = left;
			this.top = top;
			this._width = _width;
			this._height = _height;
			this._left = _left;
			this._top = _top;
			this.offsetL = offsetL;
			this.offsetT = offsetT;
			this.prop = prop;
			this.imgWidth = imgWidth;
			this.imgHeight = imgHeight;
			this._imgWidth = _imgWidth;
			this._imgHeight = _imgHeight;
		},
		execute: function(){
			var img=$("img",this.ele), imgdrag=$(".imgdrag",this.ele), imghandle=$(".imghandle",this.ele);
			var _imgdrag=$("#conpages .imgdrag").eq($("#conbox .imgdrag").index(imgdrag)), _img=$("img",_imgdrag);
			var posL, posT, enlRate=1.2;
			this.prop = _imgdrag.parent().parent().parent().data("data").v_scale;
			if(this.ele.parent().data("compare").conScale < this.ele.parent().data("compare").imgScale){
				if((this.height / enlRate) < this.ele.height() || (this.width / enlRate) < this.ele.width()){
					if(this.ele.width() / this.ele.height() < this.ele.parent().data("compare").imgScale){
						this.imgWidth = this.ele.height() * this.ele.parent().data("compare").imgScale;
						this.imgHeight = this.ele.height();
						img.height(this.imgHeight);
						posL = this.left + (this.width - this.imgWidth) / 2;
						imgdrag.css({"left":posL > 0 ? 0 : posL,"top":0});
					}
					else {
						this.imgWidth = this.ele.width();
						this.imgHeight = this.ele.width() / this.ele.parent().data("compare").imgScale;
						img.height(this.imgHeight);
						posT = this.top + (this.height - this.imgHeight) / 2;
						imgdrag.css({"left":0,"top":posT > 0 ? 0 : posT});
					}
				}
				else {
					this.imgWidth = this.width / enlRate;
					this.imgHeight = this.height / enlRate;
					img.height(this.imgHeight);
					posL = this.left + (this.width - this.imgWidth) / 2;
					posT = this.top + (this.height - this.imgHeight) / 2;
					imgdrag.css({"left":posL > 0 ? 0 : posL,"top":posT > 0 ? 0 : posT});
				}
				this._imgWidth = this.imgWidth / this.prop;
				this._imgHeight = this.imgHeight / this.prop;
				_img.height(this._imgHeight);
			}
			else {
				if((this.height / enlRate) < this.ele.height() || (this.width / enlRate) < this.ele.width()){
					if(this.ele.width() / this.ele.height() < this.ele.parent().data("compare").imgScale){
						this.imgWidth = this.ele.height() * this.ele.parent().data("compare").imgScale;
						this.imgHeight = this.ele.height();
						img.width(this.imgWidth);
						posL = this.left + (this.width - this.imgWidth) / 2;
						imgdrag.css({"left":posL > 0 ? 0 : posL,"top":0});
					}
					else {
						this.imgWidth = this.ele.width();
						this.imgHeight = this.ele.width() / this.ele.parent().data("compare").imgScale;
						img.width(this.imgWidth);
						posT = this.top + (this.height - this.imgHeight) / 2;
						imgdrag.css({"left":0,"top":posT > 0 ? 0 : posT});
					}
				}
				else {
					this.imgWidth = this.width / enlRate;
					this.imgHeight = this.height / enlRate;
					img.width(this.imgWidth);
					posL = this.left + (this.width - this.imgWidth) / 2;
					posT = this.top + (this.height - this.imgHeight) / 2
					imgdrag.css({"left":posL > 0 ? 0 : posL,"top":posT > 0 ? 0 : posT});
				}
				this._imgWidth = this.imgWidth / this.prop;
				this._imgHeight = this.imgHeight / this.prop;
				_img.width(this._imgWidth);
			}
			if((Math.abs(this.imgWidth - this.ele.width()) < 2) || (Math.abs(this.imgHeight - this.ele.height()) < 2)){
				$(".narrow_bt",this.ele).addClass("invalid");
			}
			imgdrag.width(this.imgWidth).height(this.imgHeight).draggable('option', 'containment',[this.offsetL-this.imgWidth+this.ele.width(),this.offsetT-this.imgHeight+this.ele.height(),this.offsetL,this.offsetT]);
			_imgdrag.width(this._imgWidth).height(this._imgHeight).css({"left": clearLetter(imgdrag.css("left")) / this.prop,"top": clearLetter(imgdrag.css("top")) / this.prop});
			imghandle.css({"left":(this.ele.width()-imghandle.width()) / 2 - clearLetter(imgdrag.css("left")),
	        "top":(this.ele.height()-imghandle.height()) / 2 - clearLetter(imgdrag.css("top"))});
		},
		undo: function(){
			var img=$("img",this.ele), imgdrag=$(".imgdrag",this.ele), imghandle=$(".imghandle",this.ele);
			var _imgdrag=$("#conpages .imgdrag").eq($("#conbox .imgdrag").index(imgdrag)), _img=$("img",_imgdrag);
			var posL, posT, enlRate=1.2;
			if(this.ele.parent().data("compare").conScale < this.ele.parent().data("compare").imgScale){
				img.height(this.height);
				_img.height(this._height);
			}
			else {
				img.width(this.width);
				_img.width(this._width);
			}
			$(".narrow_bt",this.ele).removeClass("invalid");
			imgdrag.width(this.width).height(this.height).css({"left": this.left,"top": this.top}).draggable('option', 'containment',[this.offsetL-this.width+this.ele.width(),this.offsetT-this.height+this.ele.height(),this.offsetL,this.offsetT]);
			_imgdrag.width(this._width).height(this._height).css({"left": this._left,"top": this._top});
			imghandle.css({"left":(this.ele.width()-imghandle.width()) / 2 - this.left,
	        "top":(this.ele.height()-imghandle.height()) / 2 - this.top});
		},
		redo: this.execute
	});
	myCommand5 = Undo.Command.extend({
		constructor: function(ele,cwidth,cheight,cleft,ctop,width,height,width1,height1,left,top,handleleft,handletop,offsetL,offsetT,offsetL1,offsetT1,prop,cwidth1,cheight1,cleft1,ctop1,left1,top1,handleleft1,handletop1){
			this.ele = ele;
			this.cwidth = cwidth;
			this.cheight = cheight;
			this.cleft = cleft;
			this.ctop = ctop;
			this.width = width;
			this.height = height;
			this.width1 = width1;
			this.height1 = height1;
			this.left = left;
			this.top = top;
			this.handleleft = handleleft;
			this.handletop = handletop;
			this.offsetL = offsetL;
			this.offsetT = offsetT;
			this.offsetL1 = offsetL1;
			this.offsetT1 = offsetT1;
			this.prop = prop;
			this.cwidth1 = cwidth1;
			this.cheight1 = cheight1;
			this.cleft1 = cleft1;
			this.ctop1 = ctop1;
			this.left1 = left1;
			this.top1 = top1;
			this.handleleft1 = handleleft1;
			this.handletop1 = handletop1;
		},
		execute: function(){
			
		},
		undo: function(){
			var img=$("img",this.ele), imgdrag=$(".imgdrag",this.ele), imghandle=$(".imghandle",this.ele), narrow=$(".narrow_bt",this.ele);
			var _controls=$("#conpages .controls").eq($("#conbox .controls").index(this.ele)), _imgdrag=$(".imgdrag",_controls), _img=$("img",_controls);
			this.cwidth1=this.ele.width();
			this.cheight1=this.ele.height();
			this.cleft1=clearLetter(this.ele.css("left"));
			this.ctop1=clearLetter(this.ele.css("top"));
			this.left1=clearLetter(imgdrag.css("left"));
			this.top1=clearLetter(imgdrag.css("top"));
			this.handleleft1=clearLetter(imghandle.css("left"));
			this.handletop1=clearLetter(imghandle.css("top"));
			this.ele.width(this.cwidth).height(this.cheight).css({"left": this.cleft,"top": this.ctop});
			_controls.width(this.cwidth / this.prop).height(this.cheight / this.prop).css({"left": this.cleft / this.prop,"top": this.ctop / this.prop});
			$(".imgbox",this.ele).width(this.cwidth).height(this.cheight);
			$(".imgbox",_controls).width(_controls.width()).height(_controls.height());
			if(narrow.hasClass("invalid") && this.cwidth < this.width && this.cheight < this.height){
				narrow.removeClass("invalid");
			}
			else if(!narrow.hasClass("invalid") && (!(this.cwidth < this.width) || !(this.cheight < this.height))){
				narrow.addClass("invalid");
			}
			if($("img",this.ele).length > 0){
				if(this.ele.data("compare").conScale < this.ele.data("compare").imgScale){
					img.height(this.height);
					_img.height(this.height / this.prop);
				}
				else {
					img.width(this.width);
					_img.width(this.width / this.prop);
				}
				imgdrag.width(this.width).height(this.height).css({"left": this.left,"top": this.top}).draggable('option', 'containment',[this.offsetL-imgdrag.width()+this.ele.width(),this.offsetT-imgdrag.height()+this.ele.height(),this.offsetL,this.offsetT]);
				_imgdrag.width(_img.width()).height(_img.height()).css({"left": this.left / this.prop,"top": this.top / this.prop});
				imghandle.css({"left": this.handleleft,"top": this.handletop});
		    }
		},
		redo: function(){
			var img=$("img",this.ele), imgdrag=$(".imgdrag",this.ele), imghandle=$(".imghandle",this.ele), narrow=$(".narrow_bt",this.ele);
			var _controls=$("#conpages .controls").eq($("#conbox .controls").index(this.ele)), _imgdrag=$(".imgdrag",_controls), _img=$("img",_controls);
			this.ele.width(this.cwidth1).height(this.cheight1).css({"left": this.cleft1,"top": this.ctop1});
			_controls.width(this.cwidth1 / this.prop).height(this.cheight1 / this.prop).css({"left": this.cleft1 / this.prop,"top": this.ctop1 / this.prop});
			$(".imgbox",this.ele).width(this.cwidth1).height(this.cheight1);
			$(".imgbox",_controls).width(_controls.width()).height(_controls.height());
			if(narrow.hasClass("invalid") && this.cwidth1 < this.width1 && this.cheight1 < this.height1){
				narrow.removeClass("invalid");
			}
			else if(!narrow.hasClass("invalid") && (!(this.cwidth1 < this.width1) || !(this.cheight1 < this.height1))){
				narrow.addClass("invalid");
			}
			if($("img",this.ele).length > 0){
				if(this.ele.data("compare").conScale < this.ele.data("compare").imgScale){
					img.height(this.height1);
					_img.height(this.height1 / this.prop);
				}
				else {
					img.width(this.width1);
					_img.width(this.width1 / this.prop);
				}
				imgdrag.width(this.width1).height(this.height1).css({"left": this.left1,"top": this.top1}).draggable('option', 'containment',[this.offsetL1-imgdrag.width()+this.ele.width(),this.offsetT1-imgdrag.height()+this.ele.height(),this.offsetL1,this.offsetT1]);
				_imgdrag.width(_img.width()).height(_img.height()).css({"left": this.left1 / this.prop,"top": this.top1/ this.prop});
				imghandle.css({"left": this.handleleft1,"top": this.handletop1});
			}
		}
	});
    myCommand6 = Undo.Command.extend({
		constructor: function(obj1,obj2,refer1,refer2,bak1,bak2,idx){
			this.obj1 = obj1;
			this.obj2 = obj2;
			this.refer1 = refer1;
			this.refer2 = refer2;
			this.bak1 = bak1;
			this.bak2 = bak2;
			this.idx = idx;
		},
		execute: function(){
			if(this.obj1.hasClass("fontCtrl")){
				this.refer1=this.obj1.prev();
				this.bak1=this.obj1.detach();
				$("#editPanel").hide();
				$(".copy").addClass("c_invalid");
			}
			else {
				var img = $("img",this.obj1);
				this.refer1=this.obj1.prev();
				this.refer2=this.obj2.prev();
				this.bak1=this.obj1.detach();
				this.bak2=this.obj2.detach();
				if(img.length > 0){
					var count = 0, self_idx = this.idx = img.data("index");
					$("#conbox .imgdrag img").each(function(i){
						$(this).data("index") == self_idx ? count+=1 : count+=0;
					});
					if(count == 0){
						$(".img_ctn").eq(this.idx).removeClass("used").show();
					}
				}
			}
			$(".delete").addClass("d_invalid");
		},
		undo: function(){
			if(this.bak1.hasClass("fontCtrl")){
				this.refer1.after(this.bak1).next().trigger("mousedown");
			}
			else {
				this.refer1.after(this.bak1).next().trigger("mousedown");
				this.refer2.after(this.bak2);
				$(".img_ctn").eq(this.idx).addClass("used");
				if($(".hideused input").hasClass("hideable")){
					$(".img_ctn").eq(this.idx).hide();
				}
			}
		},
		redo: this.execute
	});
    myCommand7 = Undo.Command.extend({
		constructor: function(str,obj1,obj2,bak1,bak2,prop){
			this.str = str;
			this.obj1 = obj1;
			this.obj2 = obj2;
			this.bak1 = bak1;
			this.bak2 = bak2;
			this.prop = prop;
		},
		execute: function(){
			this.obj1.append(this.str);
			this.obj2.append(this.str);
			var addcontrols=$(".controls",this.obj1).last(), _addcontrols=$(".controls",this.obj2).last();
			var imgdrag = $(".imgdrag",addcontrols), _imgdrag = $(".imgdrag",_addcontrols), imghandle = $(".imghandle",addcontrols);
			this.prop = this.obj2.data("data").v_scale;
			$(".enlarge_bt,.narrow_bt,.imghandle,.controlsline",_addcontrols).remove();
			addcontrols.width(260).height(200).css({"left": (this.obj1.width() - addcontrols.width()) / 2,"top": (this.obj1.height() - addcontrols.height()) / 2,"background-size": "175px 140px","background-position": "42px 30px"}).draggable({
				addClasses: false,
				containment: "parent",
				cancel: ".ui-resizable-handle, .imghandle",
				scroll: false,
				start: function(event,ui){
					$(this).data("startpis",{pis1: $(this).css("left"), pis2: $(this).css("top")});
				},
				drag: function(event,ui){
					_addcontrols.css({"left": clearLetter($(this).css("left")) / this.prop,"top": clearLetter($(this).css("top")) / this.prop});
				},
				stop: function(event,ui){
					imgdrag.draggable('option', 'containment',[getLeft(this)-imgdrag.width()+$(this).width(),getTop(this)-imgdrag.height()+$(this).height(),getLeft(this),getTop(this)]);
					stack.execute(new myCommand1($(this), $(this).data("startpis").pis1, $(this).data("startpis").pis2));
				}
			}).resizable({
				handles: "all",
				alsoResize: ".ui-resizable-resizing .imgbox",
				containment: "#conbox .container",
				start: function(event,ui){
					$(this).data("data",{cwidth: $(this).width(), cheight: $(this).height(), cleft: clearLetter($(this).css("left")), ctop: clearLetter($(this).css("top")), width: $("img",this).width(), height: $("img",this).height(), left: clearLetter($(".imgdrag",this).css("left")), top: clearLetter($(".imgdrag",this).css("top")), handleleft: clearLetter($(".imghandle",this).css("left")), handletop: clearLetter($(".imghandle",this).css("top"))});
				},
				resize: function(event,ui){
					var cond, img=$("img",this), _img = $("img",_addcontrols), _imgbox = $(".imgbox",_addcontrols), narrow=$(".narrow_bt",this);
					_addcontrols.width(ui.size.width / this.prop).height(ui.size.height / this.prop).css({"left": ui.position.left / this.prop,"top": ui.position.top / this.prop});
					_imgbox.width(_addcontrols.width()).height(_addcontrols.height());
					if(img.length>0){
						switch($(this).data("swi")){
							case 1:	
								cond = imgdrag.width()-ui.size.width + $(this).data("data").left;
								if(!(cond > 0)){
									imgdrag.css("left",ui.size.width-imgdrag.width());
									_imgdrag.css("left",clearLetter(imgdrag.css("left")) / this.prop);
								}
								if(narrow.hasClass("invalid") && ui.size.width < imgdrag.width() && ui.size.height < imgdrag.height()){
									narrow.removeClass("invalid");
								}
								else if(!narrow.hasClass("invalid") && (!(ui.size.width < imgdrag.width()) || !(ui.size.height < imgdrag.height()))){
									narrow.addClass("invalid");
								}
								imghandle.css("left",(ui.size.width-imghandle.width()) / 2 - clearLetter(imgdrag.css("left")));
								break;
							case 2:	
								cond = imgdrag.height()-ui.size.height + $(this).data("data").top;
								if(!(cond > 0)){
									imgdrag.css("top",ui.size.height-imgdrag.height());
									_imgdrag.css("top",clearLetter(imgdrag.css("top")) / this.prop);
								}
								if(narrow.hasClass("invalid") && ui.size.width < imgdrag.width() && ui.size.height < imgdrag.height()){
									narrow.removeClass("invalid");
								}
								else if(!narrow.hasClass("invalid") && (!(ui.size.width < imgdrag.width()) || !(ui.size.height < imgdrag.height()))){
									narrow.addClass("invalid");
								}
								imghandle.css("top",(ui.size.height-imghandle.height()) / 2 - clearLetter(imgdrag.css("top")));
								break;
							case 3:	
								cond = $(this).data("data").left + ui.size.width - ui.originalSize.width;
								if(!(cond > 0)){
									imgdrag.css("left",cond);
									_imgdrag.css("left",cond / this.prop);
								}
								if(narrow.hasClass("invalid") && ui.size.width < imgdrag.width() && ui.size.height < imgdrag.height()){
									narrow.removeClass("invalid");
								}
								else if(!narrow.hasClass("invalid") && (!(ui.size.width < imgdrag.width()) || !(ui.size.height < imgdrag.height()))){
									narrow.addClass("invalid");
								}
								imghandle.css("left",(ui.size.width-imghandle.width()) / 2 - clearLetter(imgdrag.css("left")));
								break;
							case 4:	
								cond = $(this).data("data").top + ui.size.height - ui.originalSize.height;
								if(!(cond > 0)){
									imgdrag.css("top",cond);
									_imgdrag.css("top",cond / this.prop);
								}
								if(narrow.hasClass("invalid") && ui.size.width < imgdrag.width() && ui.size.height < imgdrag.height()){
									narrow.removeClass("invalid");
								}
								else if(!narrow.hasClass("invalid") && (!(ui.size.width < imgdrag.width()) || !(ui.size.height < imgdrag.height()))){
									narrow.addClass("invalid");
								}
								imghandle.css("top",(ui.size.height-imghandle.height()) / 2 - clearLetter(imgdrag.css("top")));
								break;
							default:
								var scale_w=ui.originalSize.width / $(this).data("data").width, scale_h=ui.originalSize.height / $(this).data("data").height, scale_l=$(this).data("data").left / $(this).data("data").cwidth, scale_t=$(this).data("data").top / $(this).data("data").cwidth;
								($(this).data("compare").conScale < $(this).data("compare").imgScale) ?
								(img.height(ui.size.height / scale_h),_img.height(img.height() / this.prop)) : 
								(img.width(ui.size.width / scale_w),_img.width(img.width() / this.prop));
								imgdrag.width(img.width()).height(img.height()).css({"left":ui.size.width*scale_l,"top":ui.size.width*scale_t});
								_imgdrag.width(_img.width()).height(_img.height()).css({"left": clearLetter(imgdrag.css("left")) / this.prop,"top": clearLetter(imgdrag.css("top")) / this.prop});
								imghandle.css({"left":(ui.size.width-imghandle.width()) / 2 - ui.size.width*scale_l,
								"top":(ui.size.height-imghandle.height()) / 2 - ui.size.width*scale_t});
							    break;
						}
				    }
				},
				stop: function(event,ui){
					if($("img",this).length>0){
						imgdrag.draggable('option', 'containment',[getLeft(this)-imgdrag.width()+$(this).width(),getTop(this)-imgdrag.height()+$(this).height(),getLeft(this),getTop(this)]);
						$(this).resizable('option', 'maxWidth', imgdrag.width()).resizable('option', 'maxHeight', imgdrag.height());
					}
					stack.execute(new myCommand5($(this), $(this).data("data").cwidth, $(this).data("data").cheight, $(this).data("data").cleft, $(this).data("data").ctop, $(this).data("data").width, $(this).data("data").height, $(this).data("data").left, $(this).data("data").top, $(this).data("data").handleleft, $(this).data("data").handletop));
				}
			}).trigger("mousedown");
			$(".imgbox",addcontrols).width(addcontrols.width()).height(addcontrols.height()).droppable({
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
					$(this).parent().removeClass("active").data("compare",{conScale: $(this).width() / $(this).height(),imgScale: ui.draggable.width() / ui.draggable.height()});
					var img=$("img",this), imgdrag=$(".imgdrag",this), _imgdrag = $("#conpages .imgdrag").eq($("#conbox .imgbox").index(this)), swi;
					if(img.length>0){
						swi = 1;
						$(this).data("data",{width: imgdrag.width(), height: imgdrag.height()});
						stack.execute(new myCommand2($(this), _imgdrag, ui.draggable, swi, $(this).data("data").width, $(this).data("data").height, img.data("index")));
					}
					else {
						swi = 0;
						stack.execute(new myCommand2($(this), _imgdrag, ui.draggable, swi));
					}
				}
			});
			imgdrag.draggable({
				handle: ".imghandle",
				cursor: "all-scroll",
				addClasses: false,
				start: function(event,ui){
					$(this).data("startpis",{pis1: $(this).css("left"), pis2: $(this).css("top")});
				},
				drag: function(event,ui){
					_imgdrag.css({"left": clearLetter($(this).css("left")) / this.prop,"top": clearLetter($(this).css("top")) / this.prop});
				},
				stop: function(event,ui){
					stack.execute(new myCommand1($(this), $(this).data("startpis").pis1, $(this).data("startpis").pis2));
				}
			});
			_addcontrols.width(addcontrols.width() / this.prop).height(addcontrols.height() / this.prop).css({"left": (this.obj2.width() - _addcontrols.width()) / 2,"top": (this.obj2.height() - _addcontrols.height()) / 2});
			$(".imgbox",_addcontrols).width(_addcontrols.width()).height(_addcontrols.height());
		},
		undo: function(){
			this.bak1=$(".controls",this.obj1).last().detach();
			this.bak2=$(".controls",this.obj2).last().detach();
		},
		redo: function(){
			this.obj1.append(this.bak1);
			this.obj2.append(this.bak2);
		}
	});
    myCommand8 = Undo.Command.extend({
		constructor: function(obj1,left,obj2,imgdrag,prop){
			this.obj1 = obj1;
			this.obj2 = obj2;
			this.imgdrag = imgdrag;
			this.left = left;
			this.prop = prop;
		},
		execute: function(){
			this.prop = this.obj2.parent().data("data").v_scale;
			this.left--;
			this.obj1.css("left",this.left);
			if(this.obj1.hasClass("controls")){
				this.obj2.css("left",this.left / this.prop);
				this.imgdrag.draggable('option', 'containment',[getLeft(this.obj1[0])-this.imgdrag.width()+this.obj1.width(),getTop(this.obj1[0])-this.imgdrag.height()+this.obj1.height(),getLeft(this.obj1[0]),getTop(this.obj1[0])]);
			}
		},
		undo: function(){
			this.left++;
			this.obj1.css("left",this.left);
			if(this.obj1.hasClass("controls")){
				this.obj2.css("left",this.left / this.prop);
				this.imgdrag.draggable('option', 'containment',[getLeft(this.obj1[0])-this.imgdrag.width()+this.obj1.width(),getTop(this.obj1[0])-this.imgdrag.height()+this.obj1.height(),getLeft(this.obj1[0]),getTop(this.obj1[0])]);
			}
		},
		redo: this.execute
	});
    myCommand9 = myCommand8.extend({
		execute: myCommand8.prototype.undo,
		undo: myCommand8.prototype.execute,
		redo: myCommand8.prototype.undo
	});
    myCommand10 = Undo.Command.extend({
		constructor: function(obj1,top,obj2,imgdrag,prop){
			this.obj1 = obj1;
			this.obj2 = obj2;
			this.imgdrag = imgdrag;
			this.top = top;
			this.prop = prop;
		},
		execute: function(){
			this.prop = this.obj2.parent().data("data").v_scale;
			this.top--;
			this.obj1.css("top",this.top);
			if(this.obj1.hasClass("controls")){
				this.obj2.css("top",this.top / this.prop);
				this.imgdrag.draggable('option', 'containment',[getLeft(this.obj1[0])-this.imgdrag.width()+this.obj1.width(),getTop(this.obj1[0])-this.imgdrag.height()+this.obj1.height(),getLeft(this.obj1[0]),getTop(this.obj1[0])]);
			}
		},
		undo: function(){
			this.top++;
			this.obj1.css("top",this.top);
			if(this.obj1.hasClass("controls")){
				this.obj2.css("top",this.top / this.prop);
				this.imgdrag.draggable('option', 'containment',[getLeft(this.obj1[0])-this.imgdrag.width()+this.obj1.width(),getTop(this.obj1[0])-this.imgdrag.height()+this.obj1.height(),getLeft(this.obj1[0]),getTop(this.obj1[0])]);
			}
		},
		redo: this.execute
	});
    myCommand11 = myCommand10.extend({
		execute: myCommand10.prototype.undo,
		undo: myCommand10.prototype.execute,
		redo: myCommand10.prototype.undo
	});
    myCommand12 = Undo.Command.extend({
		constructor: function(container,ele,bak){
			this.container = container;
			this.ele = ele;
			this.bak = bak;
		},
		execute: function(){
			
		},
		undo: function(){
			if(this.ele.hasClass("fontCur")){
				this.ele.removeClass("fontCur");
				$("#editPanel").hide();
				$(".delete").addClass("d_invalid");
				$(".copy").addClass("c_invalid");
			}
			this.bak = this.ele.detach();
		},
		redo: function(){
			$(".controls",this.container).first().before(this.bak);
		}
	});
    myCommand13 = Undo.Command.extend({
		constructor: function(ele,h1,h2){
			this.ele = ele;
			this.h1 = h1;
			this.h2 = h2;
		},
		execute: function(){
			
		},
		undo: function(){
			this.ele.html(this.h1);
		},
		redo: function(){
			this.ele.html(this.h2);
		}
	});
    myCommand14 = Undo.Command.extend({
		constructor: function(ele,bak){
			this.ele = ele;
			this.bak = bak;
		},
		execute: function(){
			
		},
		undo: function(){
			this.bak = this.ele.next().detach();
			this.ele.trigger("mousedown");
		},
		redo: function(){
			this.ele.after(this.bak).next().trigger("mousedown");
		}
	});
    myCommand15 = Undo.Command.extend({
		constructor: function(ele,name1,name2,val1,val2){
			this.ele = ele;
			this.name1 = name1;
			this.name2 = name2;
			this.val1 = val1;
			this.val2 = val2;
		},
		execute: function(){
			
		},
		undo: function(){
			$(".fontCur").css(this.name1, this.val1).data(this.name2, this.val1);
			this.ele.val(this.val1);
		},
		redo: function(){
			$(".fontCur").css(this.name1, this.val2).data(this.name2, this.val2);
			this.ele.val(this.val2);
		}
	});
    myCommand17 = Undo.Command.extend({
		constructor: function(ele,color1,color2){
			this.ele = ele;
			this.color1 = color1;
			this.color2 = color2;
		},
		execute: function(){
			
		},
		undo: function(){
			this.ele.css("background-color", this.color1);
			$(".fontCur").css("color", this.color1).data("color", this.color1);
		},
		redo: function(){
			this.ele.css("background-color", this.color2);
			$(".fontCur").css("color", this.color2).data("color", this.color2);
		}
	});
    myCommand18 = Undo.Command.extend({
		constructor: function(ele,val1,val2){
			this.ele = ele;
			this.val1 = val1;
			this.val2 = val2;
		},
		execute: function(){
			
		},
		undo: function(){
			var fontCur = $(".fontCur");
			if(this.ele.hasClass("bold")){
				this.val2 = fontCur.css("font-weight");
				fontCur.css("font-weight", this.val1);
			}
			else {
				this.val2 = fontCur.css("text-align");
				fontCur.css("text-align", this.val1);
			}
		},
		redo: function(){
			var fontCur = $(".fontCur");
			if(this.ele.hasClass("bold")){
				fontCur.css("font-weight", this.val2);
			}
			else {
				fontCur.css("text-align", this.val2);
			}
		}
	});
    myCommand19 = Undo.Command.extend({
		constructor: function(ele,container,drag,bak1,bak2){
			this.ele = ele;
			this.container = container;
			this.drag = drag;
			this.bak1 = bak1;
			this.bak2 = bak2;
		},
		execute: function(){
			var img = $("img",this.ele).first(), ori_h = img.height();
			var _img = $("img",this.container).first(), _ori_h = _img.height();
			this.bak1 = img.detach();
			this.bak2 = _img.detach();
			this.drag.clone().height(ori_h).prependTo(this.ele);
			this.drag.clone().height(_ori_h).prependTo(this.container);
		},
		undo: function(){
			$("img",this.ele).first().remove();
			$("img",this.container).first().remove();
			this.ele.prepend(this.bak1);
			this.container.prepend(this.bak2);
		},
		redo: this.execute
	});
	/*stack.changed = function(){
		stackStatus();
	}
	function stackStatus(){
		$(".undo").css("color",(!stack.canUndo())==true ? "#ccc" : "#666");
		$(".redo").css("color",(!stack.canRedo())==true ? "#ccc" : "#666");
	}*/