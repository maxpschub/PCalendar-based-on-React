import './calendar.scss';
//日历组件
/*配置格式
 config: {
 	target: document.getElementById("container"),
 	date:new Date(),
 	type:"show", //or "hide"
 	format:function(date){return formatRes},
 	callback:function(date){}
 }
*/
var PCalendar = function(config){
	//get now
	this.now = new Date();
	this.configDate = config.date;//保存默认日期

	this.year = config.date.getFullYear() || this.now.getFullYear();
	this.month = config.date.getMonth()+1 || this.now.getMonth()+1;
	this.date = config.date.getDate() || this.now.getDate();

	// this.duration = config.duration || 1;
	this.daysInMonth = [];
	this.daysInCalendar = [];
	this.target = config.target;
	this.callback = config.callback || function(date){console.log(date)};
	this.type = config.type || "show";
	this.format = config.format || null;

	this.init();
}

PCalendar.prototype = {
	//初始化
	init:function(){
		//固定DOM结构
		this.target.innerHTML = ""
		+"<div class='calendar'>"
		+"<div class='calendar-head'>"
				+"<div class='head-top'><span class='pre-month'>←</span><div class='year'></div>年"
				+"<div class='month'>"
				+"<select>"
				+"<option value='1'>1</option>"
				+"<option value='2'>2</option>"
				+"<option value='3'>3</option>"
				+"<option value='4'>4</option>"
				+"<option value='5'>5</option>"
				+"<option value='6'>6</option>"
				+"<option value='7'>7</option>"
				+"<option value='8'>8</option>"
				+"<option value='9'>9</option>"
				+"<option value='10'>10</option>"
				+"<option value='11'>11</option>"
				+"<option value='12'>12</option>"
				+"</select>"
				+"</div>月"
				+"<span class='next-month'>→</span></div>"			
				+"<ul>"
					+"<li>Sun</li>"
					+"<li>Mon</li>"
					+"<li>Tue</li>"
					+"<li>Wed</li>"
					+"<li>Thu</li>"
					+"<li>Fri</li>"
					+"<li>Sat</li>"
				+"</ul>"
			+"</div>"
			+"<div class='calendar-body'>"
				+"<ul>"
				+"</ul>"
			+"</div>"
		+"</div>";

		//显示、隐藏日历
		if(this.type=="hide"){
			this.target.innerHTML = ""
			+"<div class='calendar-wrap'>"
				+"<a href='javascript:;' class='calendar-btn'>请选择日期</a>"
				+"<div class='calendar absolute'>"
				+"<div class='calendar-head'>"
						+"<div class='head-top'><span class='pre-month'>←</span><div class='year'></div>年"
						+"<div class='month'>"
						+"<select>"
						+"<option value='1'>1</option>"
						+"<option value='2'>2</option>"
						+"<option value='3'>3</option>"
						+"<option value='4'>4</option>"
						+"<option value='5'>5</option>"
						+"<option value='6'>6</option>"
						+"<option value='7'>7</option>"
						+"<option value='8'>8</option>"
						+"<option value='9'>9</option>"
						+"<option value='10'>10</option>"
						+"<option value='11'>11</option>"
						+"<option value='12'>12</option>"
						+"</select>"
						+"</div>月"
						+"<span class='next-month'>→</span></div>"			
						+"<ul>"
							+"<li>Sun</li>"
							+"<li>Mon</li>"
							+"<li>Tue</li>"
							+"<li>Wed</li>"
							+"<li>Thu</li>"
							+"<li>Fri</li>"
							+"<li>Sat</li>"
						+"</ul>"
					+"</div>"
					+"<div class='calendar-body'>"
						+"<ul>"
						+"</ul>"
					+"</div>"
				+"</div>";
			+"</div>";

			this.eCalendar = this.target.querySelector(".calendar");
			this.eBtn = this.target.querySelector(".calendar-btn");
			this.eCalendar.style.display = "none";
			this.eBtn.textContent = this.format(this.configDate);
			var _this = this;

			this.eBtn.addEventListener("click", function(){
				if(_this.eCalendar.style.display=="none"){
					this.textContent = "请选择日期";
					_this.eCalendar.style.display = "block";
				}else{
					this.textContent = _this.format(_this.configDate);
					_this.eCalendar.style.display = "none";
				}
					
			},false);
		}
		//切换月份
		this.target.querySelector(".pre-month").addEventListener("click", function(){
			this.switchYearMonth("pre");
			this.getCal();
		}.bind(this),false);
		this.target.querySelector(".next-month").addEventListener("click", function(){
			this.switchYearMonth("next");
			this.getCal();
		}.bind(this),false);
		this.target.querySelector(".head-top .month").addEventListener("change",function(event){
			var selectMonth = event.target.value;
			this.switchYearMonth(null,this.year,selectMonth);
			this.getCal();
		}.bind(this),false);

		this.getCal();
	},
	//计算当前页日历数据
	getCal:function(tYear,tMonth){
		var mLength,pLength;//当前、上月天数
		if(tYear && tMonth){//切换到指定年,月份
			mLength = this.getMLength(tYear,tMonth);
			pLength = tMonth==1 ? this.getMLength(tYear-1,12) : this.getMLength(tYear,tMonth-1);
		}else{
			mLength = this.getMLength(this.year,this.month);
			pLength = this.month==1 ? this.getMLength(this.year-1,12) : this.getMLength(this.year,this.month-1);
		}
		//当前月天数
		this.daysInMonth = [];
		for(var i = 1;i<=mLength;i++){
			this.daysInMonth.push(i);
		}
		//当前日历页所有天数
		this.daysInCalendar = [];
		var stDay = new Date(tYear || this.year,tMonth-1 || this.month-1,1).getDay();//当前月第一天星期,对应前面加上月天数
		// console.log(stDay);
		for(var i = 0;i<stDay;i++){
			this.daysInCalendar.unshift({type:"pre",value:pLength});
			pLength--;
		}
		this.daysInCalendar.push(this.daysInMonth);
		var rest = 42 - stDay - this.daysInMonth.length;
		for(var i = 1;i<=rest;i++){
			this.daysInCalendar.push({type:"next",value:i});
		}
		this.renderCal();
	},
	//根据数据渲染页面
	renderCal:function(){
		var days = "";
		for(var i=0;i<this.daysInCalendar.length;i++){
			var day = this.daysInCalendar[i];
			if(isArray(day)){//当前月
				for(var j in day){
					if((day[j]==this.configDate.getDate()) && (this.month==this.configDate.getMonth()+1) && (this.year==this.configDate.getFullYear())){//当天
						days+=("<li class='active'>"+day[j]+"</li>");
					}else{
						days+=("<li>"+day[j]+"</li>");
					}
				}
			}else{//其他
				if(day.type=="pre"){//上个月
					days+=("<li class='not-belong' daybelong='pre'>"+day.value+"</li>");
				}else{//下个月
					days+=("<li class='not-belong' daybelong='next'>"+day.value+"</li>");
				}
			}
		};
		this.target.querySelector(".calendar-body>ul").innerHTML = days;
		this.target.querySelector(".calendar-head .year").innerHTML = ""
		+"<select>"
		+"<option value='"+~~(this.year-3)+"'>"+~~(this.year-3)+"</option>"
		+"<option value='"+~~(this.year-2)+"'>"+~~(this.year-2)+"</option>"
		+"<option value='"+~~(this.year-1)+"'>"+~~(this.year-1)+"</option>"
		+"<option value="+~~(this.year)+" selected>"+~~(this.year)+"</option>"
		+"<option value="+~~(this.year+1)+">"+~~(this.year+1)+"</option>"
		+"<option value="+~~(this.year+2)+">"+~~(this.year+2)+"</option>"
		+"<option value="+~~(this.year+3)+">"+~~(this.year+3)+"</option>"
		+"</select>";

		this.target.querySelector(".year").addEventListener("change", function(event){
			var selectYear = parseInt(event.target.value);
			this.switchYearMonth(null,selectYear,this.month);
			this.getCal();
		}.bind(this),false)

		//默认月份
		var options = this.target.querySelectorAll(".month select option");
		options.forEach(function(option){
			if(option.value==this.month){
				option.selected = true;
			}
		}.bind(this))

		//click选择日期
		var _this = this;
		var lis = this.target.querySelectorAll(".calendar-body>ul>li");
		[].forEach.call(lis,function(li){
			
			li.onclick = function(event){
				event.preventDefault();
				if(this.className=="not-belong"){
					var belong = this.attributes.daybelong.value;
					if(belong=="pre"){//pre-month
						_this.switchYearMonth("pre");
					}else if(belong=="next"){//next-month
						_this.switchYearMonth("next");
					}
				}else{
				
				}
				_this.date = ~~(this.textContent);
				_this.configDate = new Date(_this.year,_this.month-1,_this.date);
				_this.getCal();

				if(_this.type=="hide"){
					_this.eCalendar.style.display = "none";
					_this.eBtn.textContent = _this.format(_this.configDate);
				}
				// 
				_this.callback(_this.configDate,_this.format?_this.format(_this.configDate):null);//执行回调
			};
		})
	},
	//切换年月
	switchYearMonth:function(type,year,month){
		if(type){
			if(type=="pre"){
				if(this.month==1){
					this.year-=1;
					this.month=12;
				}else{
					this.month-=1;
				}
			}else if(type=="next"){
				if(this.month==12){
					this.year+=1;
					this.month=1;
				}else{
					this.month+=1;
				}
			}
		}else{//select a specific year or month
			this.year = year || this.year;
			this.month = month || this.month;
		}
	},
	//获取指定月天数
	getMLength:function(tYear,tMonth){
		var mLength;
		if(tMonth==2){//判断平年闰年
			if(tYear%400==0 || (tYear%4==0 && tYear%100!=0)){
				mLength = 29;
			}else{
				mLength = 28;
			}
		}else if(tMonth == 1 || tMonth == 3 ||tMonth == 5 || tMonth == 7 || tMonth == 8 || tMonth == 10 || tMonth == 12){
			mLength = 31;
		}else{
			mLength = 30;
		}
		return mLength;
	}
}
//判断是否为数组
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}


export default PCalendar;