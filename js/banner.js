window.onload=function(){
	var imgContainer=[
		'LXWM_30.png',
		'SY_03.png',
		'gsjj_03.png',
		'LXWM_30.png'
		];
	function getId(id){
		return document.getElementById(id);
	}
	function createD(d){
		return document.createElement(d);
	}
	var show=getId('show');
	var banner=getId('banner');
	var index=getId('index');
	var showWidth=show.offsetWidth;
	var urlWidth=imgContainer.length*showWidth;
	//创建图片ul的li
	var imgLength = imgContainer.length;
	//设置图片ul的宽度
	var bannerWidth=banner.style.width=urlWidth + "px";
	//创建图片li
	for (var i = 0; i < imgLength; i++) {
		var li = createD('li');
		li.style.width=showWidth+"px";
		var img=createD('img');
		img.src="./images/" + imgContainer[i] ;
		li.appendChild(img);
		banner.appendChild(li);	
	}
	//初始化图片ul的left:
	banner.style.left=-showWidth + "px";
	//创建点的下标
	for(var l =0;l<imgContainer.length-1;l++){
		var indexLi =createD('li');
		indexLi.className=l===0?'on':"";
		
		indexLi.onclick=function(){
			
		}
		index.appendChild(indexLi);
	}
}