window.onload = function(){
	
	var oSelectAll = new SelectAll("option_check");
	deleteItem();
	selectProduct();
	
}

function SelectAll(id){
	var oBtn = document.getElementsByClassName(id)[0];
	var selectallBtn = oBtn.getElementsByClassName("jd_check_box")[0];
	var _this = this;
	selectallBtn.flag = true;
	selectallBtn.onclick = function(){	
		
		if (this.flag) {
			_this.selectall();
			
			this.flag = false;	
		}else{
			_this.cancelAll();
			this.flag = true;	
		}
	};
	
}
SelectAll.prototype.selectall = function(){	
	var ocountPrice = new countPrice("amount");
	ocountPrice.sum();

	var all_check_btn = document.getElementsByClassName("jd_check_box");
	// console.log(all_check_btn);
	for(var i = 0 ; i < all_check_btn.length ; i ++){
		all_check_btn[i].setAttribute("check","checked"); 
	}	
}

SelectAll.prototype.cancelAll = function(){
	var ocountPrice = new countPrice("amount");
	ocountPrice.clear();

	var all_check_btn = document.getElementsByClassName("jd_check_box");
	// console.log(all_check_btn);
	for(var i = 0 ; i < all_check_btn.length ; i ++){
		all_check_btn[i].removeAttribute("check"); 
	}
}

function countPrice(id){
	this.totalPrice = document.getElementsByClassName(id)[0];
	this.itemsPrice = document.getElementsByClassName("price");
	
	var _this = this;
}

countPrice.prototype.sum = function(){
	var sum = 0;
	for(var i = 0 ; i < this.itemsPrice.length;i++){
		sum += parseFloat(this.itemsPrice[i].innerHTML.substr(1));

	}
	var zonge = document.getElementsByClassName("amount_dec")[0];
	
	this.totalPrice.innerHTML = '合计:<span>¥'+ sum.toFixed(2) +'</span>';
	zonge.innerHTML = '总额:<span>¥'+ sum.toFixed(2) +'</span>返现:<span>¥0.00</span>';
}
countPrice.prototype.clear = function(){
	var zonge = document.getElementsByClassName("amount_dec")[0];
	
	this.totalPrice.innerHTML = '合计:<span>¥0.00</span>';
	zonge.innerHTML = '总额:<span>¥0.00</span>返现:<span>¥0.00</span>';
}



function deleteItem(){
	var win = document.getElementsByClassName("jd_win")[0];
	var winCon = document.getElementsByClassName("jd_win_box")[0];	
	var delBtnTop;
	var index = 0;

	var deleteBtn = document.getElementsByClassName("deleteBox");
	for(var i = 0 ; i < deleteBtn.length; i ++){

		(function(i){
			deleteBtn[i].onclick = function(){
				
				this.index = i;
				// console.log(this.index);
				index = this.index;
				document.body.style.position = "absolute";
				win.style.display = "block";
				var top = document.body.scrollTop + (window.innerHeight - winCon.offsetHeight) / 2;
				winCon.className = "jd_win_box bounceInDown";

				//垃圾桶盖子的动画
				btn = document.getElementsByClassName("deleteBox_top");
				delBtnTop = btn[this.index];		
				delBtnTop.style.webkitTransition = "all .5s ease 0s";
				delBtnTop.style.transition = "all .5s ease 0s";
				delBtnTop.style.webkitTransform = "translateY(-5px) rotate(-45deg)";
				delBtnTop.style.transform = "translateY(-5px) rotate(-45deg)";	
			}
		})(i)
		
	}

	winCon.getElementsByClassName("cancel")[0].onclick = function(){
		winCon.style.opacity = 0;
		winCon.style.webkitTransition = "translateY(0px)"
		winCon.style.transition = "translateY(0px)";
		win.style.display = "none";
		

		//垃圾桶盖子动画
		if (deleteBtn) {
			delBtnTop.style.webkitTransition = "all .5s ease 0s";
			delBtnTop.style.transition = "all .5s ease 0s";
			delBtnTop.style.webkitTransform = "translateY(0px) rotate(0deg)";
			delBtnTop.style.transform = "translateY(0px) rotate(0deg)";
		}

		return false;
	}
	winCon.getElementsByClassName("submit")[0].onclick = function(){
		deleteProduct();
	}

	function deleteProduct(){
		var obj = document.getElementsByClassName("jd_view")[0];
		var oList = obj.getElementsByTagName("li");
		oList[index].remove();
		
		winCon.style.opacity = 0;
		winCon.style.webkitTransition = "translateY(0px)"
		winCon.style.transition = "translateY(0px)";
		win.style.display = "none";
	}

} 

function selectProduct(){
	var products = document.getElementsByClassName("select_btn");
	for(var i = 0 ; i < products.length ; i++){

		(function(i){
			products[i].onclick = function(){
				if (products[i].getAttribute("check")) {
					products[i].removeAttribute("check")
				}else{
					products[i].setAttribute("check","checked");
				}
			}
		})(i)
	}
}




var changeNum_right = document.getElementsByClassName("changeNum_right");
var changeNum_left = document.getElementsByClassName("changeNum_left");
var changeNum_input = document.getElementsByClassName("changeNum_input");

function add(inputDom){
	var num = parseInt(inputDom.getAttribute("placeholder"));					
	num++;
	if (num > 10) {
		num = 10;
	}	
	inputDom.setAttribute("placeholder",num);		
}

function plus(inputDom){
	var num = parseInt(inputDom.getAttribute("placeholder"));	
	num--;
	if (num < 0) {
		num = 0;
	}
	inputDom.setAttribute("placeholder",num);		
}


for(var i = 0 ; i < changeNum_right.length; i ++){

	(function(i){
		changeNum_right[i].onclick = function(){
			var index = i;
			add(changeNum_input[index]);
		}
		changeNum_left[i].onclick = function(){
			var index = i;
			plus(changeNum_input[index]);
		}
	})(i)
}


