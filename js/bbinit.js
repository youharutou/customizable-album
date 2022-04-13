var $jump_li = $("#bb-nav-jump li"), _this;
var bb = $("#bb-bookblock").bookblock({
	speed: 800,
	shadowSides: 0.8,
	shadowFlip: 0.7
});
$("#bb-nav-next").click(function(){
	if(!($jump_li.last().hasClass("selected"))){
		bb.next();
		_this = $jump_li.filter(".selected");
		$(".curpage").text(_this.next().text());
		_this.removeClass("selected").next().addClass("selected");
	}
});
$("#bb-nav-prev").click(function(){
	if(!($jump_li.first().hasClass("selected"))){
		bb.prev();
		_this = $jump_li.filter(".selected");
		$(".curpage").text(_this.prev().text());
		_this.removeClass("selected").prev().addClass("selected");
	}
});
$jump_li.click(function(){
	bb.jump($(this).index() + 1);
	$(this).addClass("selected").siblings().removeClass("selected");
	$(".curpage").text($(this).text());
});
$(".curpage").click(function(event){
	$(this).next().toggle();
	event.stopPropagation();
});
$(".pre-win .close").click(function(){
	$(".underlayer,.pre-win").remove();
});
$("body").click(function(){
	if($(".pre-win").length > 0){
		$("#bb-nav-jump ul").hide();
	}
});