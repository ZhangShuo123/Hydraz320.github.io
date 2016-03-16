var password = "4811";
var inputArray = [];
var point = 0;//记录几个密码变白

function $(c){
	return document.getElementsByClassName(c);
}
function check(){
	return inputArray.join("") === password;
}
function result(check){
	if(check)
		alert("密码正确！");
	else
		alert("密码错误!");
	location.reload();
}
//给数组对象添加contains
Array.prototype.contains = function (obj) {  
    var i = this.length;  
    while (i--) {  
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
} 
//生成随机数数组 n个[min,max)
function rand(n,min,max){
	var array = [];
	var randNum = min+Math.floor(Math.random()*(max-min));
	for(;array.length<n;randNum=min+Math.floor(Math.random()*(max-min))){
		if(!array.contains(randNum))
			array.push(randNum);
	}
	return array;
}
//每一次点击新的数字 就触发键盘位置的改写 
//事实上刚加载页面的时候就应该打乱
function relayout(){
	var array = rand(9,1,10);//存储随机数数组
	var numbers = $("number");
	for(var i=0;i<numbers.length;i++){
		numbers[i].innerHTML=array[i];;
	}
}
//白点绘制
function white(point){
	var points = $("point");
	for(var i=0;i<4;i++){
		if(i<point)
			points[i].style.backgroundColor="white";
		else
			points[i].style.backgroundColor="#444444";
	}
}
//核心 映射算法
function pushNext(node){
	if(node.nextSibling)
		inputArray.push(node.nextSibling.innerHTML);
	else
		inputArray.push(node.parentNode.firstChild.innerHTML);
}
//每次点了新的数字的更新 包括重布局和密码变白
function update(){
	//获取输入的密码
	pushNext(this);
	relayout();
	point++;
	white(point);
	if(point>=4)
		result(check());
}
//绑定监听器
function bind(){
	var numbers = $("number");
	for(var i=0;i<numbers.length;i++)
		numbers[i].onclick=update;
}

bind();
