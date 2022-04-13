var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
if(Sys.ie){
	$("head").append("<style type='text/css'>@font-face {font-family: '黑体'; src: url(fonts/heiti.eot);} @font-face {font-family: '新蒂下午茶基本版'; src: url(fonts/xdxwcjbb.eot);} @font-face {font-family: '新蒂小丸子小学版'; src: url(fonts/xdxwzxxb.eot);} @font-face {font-family: '迷你简黛玉'; src: url(fonts/mnjdy.eot);}</style>");
}
else {
	$("head").append("<style type='text/css'>@font-face {font-family: '黑体'; src: url(fonts/heiti.ttf);} @font-face {font-family: '新蒂下午茶基本版'; src: url(fonts/xdxwcjbb.ttf);} @font-face {font-family: '新蒂小丸子小学版'; src: url(fonts/xdxwzxxb.ttf);} @font-face {font-family: '迷你简黛玉'; src: url(fonts/mnjdy.ttf);}</style>");
}