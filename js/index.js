window.onload = function(){
	search();
	countdown();
	srollPic();
}

var search = function(){
	// 搜索框对象
	var search = document.getElementsByClassName("jd_header_box")[0];
	//banner对象
	var banner = document.getElementsByClassName("jd_banner")[0];
	// 高度
	var height = banner.offsetHeight;

	window.onscroll = function(){
		var top = document.documentElement.scrollTop||document.body.scrollTop
		if (top > height) {
			search.style.background = "rgba(201,21,35,.85)"
		}else{
			var op = top/height * 0.85;
			search.style.background = "rgba(201,21,35,"+op+")";
		}
	}

}

//双11倒计时
var countdown = function(){
	var timer = setInterval(function(){
		var EndTime= new Date('2017/04/30 00:00:00');
		var NowTime = new Date();
		var t =EndTime.getTime() - NowTime.getTime();
		var d=0;
		var h=0;
		var m=0;
		var s=0;

		var addZero = function(num){
			return num < 10 ? '0' + num : '' + num;
		};

		if(t>=0){
			day=addZero(Math.floor(t/1000/60/60/24));
			hour=addZero(Math.floor(t/1000/60/60%24));
			minute=addZero(Math.floor(t/1000/60%60));
			second=addZero(Math.floor(t/1000%60));
		}

		var timeArr = (day + hour + minute + second).split("");
		// console.log(timeArr);
		var oKillTime = document.getElementsByClassName("kill_time")[0];
		var spanList = oKillTime.getElementsByClassName("num");
		// console.log(spanList);
		for(var i = 0; i < spanList.length;i++){
			spanList[i].innerHTML = timeArr[i];
		}	
	},1000);
}

//轮播效果
var srollPic = function(){
	var oBanner = document.getElementsByClassName("jd_banner")[0];
	//获得图片宽度
	var oImgWidth = oBanner.offsetWidth;
	// console.log(oImgHeight);
	// 获得图片盒子
	var oUls = oBanner.children;
	var oImgBox = oUls[0];
	//获得轮播导航圆点盒子
	var oCriclesBox = oUls[1];
	//获得圆点数组
	var oCricles = oCriclesBox.children;

	//为图片和圆点指定自定义索引
	var index = 0;
	var timer = null;

	// 加过度
	var addTransition = function(){
		oImgBox.style.transtion = "all .1s  ease-in-out 0s";
		oImgBox.style.webkitTranstion = "all .1s  ease-in-out 0s";
	}
	// 减过度
	var removeTransition = function(){
		oImgBox.style.transtion = "none";
		oImgBox.style.webkitTranstion = "none";
	}
	//加图片平移
	var setTransform = function(t){
		oImgBox.style.transform = "translateX("+ t +"px)";
	}
	//给圆点加背景
	var setCirclesBg = function(){
		for(var i = 0 ; i < oCricles.length; i++){
			oCricles[i].style.background = "none";
		}
		oCricles[index].style.background = "#fff";
	}
	// 开始定时器
	timer = setInterval(function(){
		
		index++;
		// console.log(oCricles.length);
		if (index > oCricles.length -1 ) {
			index = 0;
		}

		addTransition();
		setTransform(-index*oImgWidth);
		setCirclesBg();

	},1000)	
	
}



