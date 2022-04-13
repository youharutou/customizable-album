var ColorHex=new Array('00','33','66','99','CC','FF')
var SpColorHex=new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF')

function intocolor()
{
var colorTable=''
for (var i=0;i<2;i++)
{
for (var j=0;j<6;j++)
   {
    colorTable=colorTable+'<tr height="10px">'
    if (i==0){
        colorTable=colorTable+'<td width="10px" style="background-color:#'+ColorHex[j]+ColorHex[j]+ColorHex[j]+'">'
	}
    else{
        colorTable=colorTable+'<td width="10px" style="background-color:#'+SpColorHex[j]+'">'
	}
    colorTable=colorTable+'<td width="10px" style="background-color:#000000">'
    for (var k=0;k<3;k++)
     {
       for (var l=0;l<6;l++)
       {
        colorTable=colorTable+'<td width="10px" style="background-color:#'+ColorHex[k+i*3]+ColorHex[l]+ColorHex[j]+'">'
       }
     }
   }
}
colorTable='<div class="clearfix" style="width: 221px; height: 22px; padding: 2px 0;"><div class="curcolor" style="width: 45px; height: 20px; border: 1px solid #999; background-color: #000; float: left; margin-right: 5px;"></div><input type="text" disabled="disabled" size="7" style="width: 60px; height: 16px; padding: 2px; border: 1px solid #999; color: #000" value="#000000" /></div>'
           +'<table cellspacing="1" cellpadding="0" style="cursor:pointer; background-color: #000; border-collapse: separate">'
           +colorTable+'</table>';      
    return "<div class='colorpanel' style='display:none; padding: 3px; padding-top: 1px; background-color: #e9e9e9; border: 1px solid #999;'>"+colorTable+"</div>";
}
function hex(x){
    return ("0" + parseInt(x).toString(16)).slice(-2);
}
function rgb2hex(rgb){
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
$(function(){
	$(".palette").on("mouseover",".colorpanel td",function(){
		$(this).css("outline","1px solid #fff");
		$(".colorpanel").has(this).find(".curcolor").css("background-color",$(this).css("background-color")).next().val(rgb2hex($(this).css("background-color")).toUpperCase());
	});
	$(".palette").on("mouseout",".colorpanel td",function(){
		$(this).css("outline","none");
	});
});