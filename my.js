/*
 *   本程序来自于 runjs.cn
 *  由Suzie Wong monkeysuzie@gmail.com 整理制作
 *  本程序由浙江工业大学学生使用
 */

/*
 * 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。
 */
function random(dayseed, indexseed) {
	var n = dayseed % 11117;
	for (var i = 0; i < 100 + indexseed; i++) {
		n = n * n;
		n = n % 11117;   // 11117 是个质数
	}
	return n;
}

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
var iday = 20130403;

var weeks = ["日","一","二","三","四","五","六"];
var directions = ["北方","东北方","东方","东南方","南方","西南方","西方","西北方"];
var activities = [
	{name:"今天去\"%m\"吃饭", good:"对面做过来一个漂亮妹纸",bad:"可能会吃出虫子"},
	{name:"在妹子面前吹牛", good:"改善你矮穷挫的形象",bad:"会被识破"},
	{name:"呆在寝室", good:"一个人认真学习",bad:"寝室空气质量极差"},
	{name:"背单词", good:"这次六级肯定过",bad:"背完50个忘了40个"},
	{name:"撸管", good:"避免缓冲区溢出",bad:"小撸怡情，大撸伤身，强撸灰飞烟灭"},
	{name:"打DOTA", good:"天梯5000分不是梦",bad:"你会遇到猪一样的队友"},
	{name:"浏览成人网站", good:"重拾对生活的信心",bad:"你会心神不宁"},
	{name:"翘课", good:"老师不会点名",bad:"教务处今天会点名"},
	{name:"刷人人", good:"看看今天同学的囧事",bad:"刷着刷着成了板砖"},
	{name:"上精弘论坛", good:"水水更健康",bad:"会被使用IP卡"},
	{name:"上陌陌", good:"女神会有回复",bad:"女神发来\"呵呵\""},
	{name:"\"%r\"逛一圈", good:"会遇到妹纸并且搭讪成功",bad:"会踩到狗屎"},
	{name:"去\"%b\"", good:"遇到漂亮妹纸",bad:"墙壁会有板砖掉下来"},
	{name:"去图书馆", good:"一口气把作业做完啦",bad:"到门口发现校园卡没带"}
];

var specials = [
	{date:20130221, type:'good', name:'防核演习', description:'万一哪个疯子丢颗核弹过来...'}
];

var buildings = ["博易楼","广知楼","建行楼","郁文楼","语林楼","仁和楼","畅远楼","理学楼"];

var roads = ["博易楼","广知楼","建行楼","郁文楼","语林楼","畅远楼","理学楼","支干路"];

var messhall = ["养贤府","家和堂","钉子户","后山","垃圾街","科院"];

var tools = ["Eclipse写程序", "MSOffice写文档", "记事本写程序", "Windows8", "Linux", "MacOS", "IE", "Android设备", "iOS设备"];


var drinks = ["水","茶","红茶","绿茶","咖啡","奶茶","可乐","牛奶","豆奶","果汁","果味汽水","苏打水","运动饮料","酸奶","酒"];

function getTodayString() {
	return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
}

// 生成今日运势
function pickTodaysLuck() {
	var numGood = random(iday, 98) % 3 + 2;
	var numBad = random(iday, 88) % 3 + 2;
	var eventArr = pickRandomActivity(numGood + numBad);
	
	var specialSize = pickSpecials();
    var num=numBad+ numGood;
    console.log(num);	
	for (var i = 0; i < num/2; i++) {
		addToGood(eventArr[2*i]);
	}
	
	for (var i = 0; i < num/2; i++) {
		addToBad(eventArr[2*i+1]);
	}
	
	
}

// 添加预定义事件
function pickSpecials() {
	var specialSize = [0,0];
	
	for (var i = 0; i < specials.length; i++) {
		var special = specials[i];
		
		if (iday == special.date) {
			if (special.type == 'good') {
				specialSize[0]++;
				addToGood({name: special.name, good: special.description});
			} else {
				specialSize[1]++;
				addToBad({name: special.name, bad: special.description});
			}
		}
	}
	
	return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(size) {
	var picked_events = pickRandom(activities, size);
	
	for (var i = 0; i < picked_events.length; i++) {
		picked_events[i] = parse(picked_events[i]);
	}
	
	return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
	var result = [];
	
	for (var i = 0; i < array.length; i++) {
		result.push(array[i]);
	}
	
	for (var j = 0; j < array.length - size; j++) {
		var index = random(iday, j) % result.length;
		result.splice(index, 1);
	}
	
	return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
	var result = {name: event.name, good: event.good, bad: event.bad};  // clone
	
	if (result.name.indexOf('%b') != -1) {
		result.name = result.name.replace('%b', buildings[random(iday, 12) % buildings.length]);
	}
	if (result.name.indexOf('%m') != -1) {
		result.name = result.name.replace('%m', messhall[random(iday, 12) % messhall.length]);
	}
	
	if (result.name.indexOf('%r') != -1) {
		result.name = result.name.replace('%r', roads[random(iday, 14) % roads.length]);
	}
	
	
	return result;
}

// 添加到“宜”
function addToGood(event) {
	$('.good .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.good + '</div></li>');
}

// 添加到“不宜”
function addToBad(event) {
	$('.bad .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.bad + '</div></li>');
}

$(function(){
	$('.date').html(getTodayString());
	$('.drink_value').html(pickRandom(drinks,2).join());
	$('.diaosi_value').html(random(iday, 7) % 50 / 10.0);
	pickTodaysLuck();
});
