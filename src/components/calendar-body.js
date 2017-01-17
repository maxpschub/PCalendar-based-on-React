import React, { Component, PropTypes } from 'react';

class CalendarBody extends Component {
	static propTypes = {
		year:PropTypes.number.isRequired,
		month:PropTypes.number.isRequired,
		date:PropTypes.number.isRequired,
		selectDate:PropTypes.func.isRequired
	}
	constructor(props){
		super(props);
		this.getMonthLength = this.getMonthLength.bind(this);
		this.getCalendar = this.getCalendar.bind(this);
	}
	getMonthLength(year,month){//获取指定月天数
		var mLength;
		if(month==2){//判断平年闰年
			if(year%400==0 || (year%4==0 && year%100!=0)){
				mLength = 29;
			}else{
				mLength = 28;
			}
		}else if(month == 1 || month == 3 ||month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
			mLength = 31;
		}else{
			mLength = 30;
		}
		return mLength;
	}
	getCalendar(year,month){//获取当前日历数据
		let daysInCalendar = [];
		let mLength = this.getMonthLength(year,month);//当前月天数
		let pLength = month==1 ? this.getMonthLength(year-1,12) : this.getMonthLength(year,month-1);//上月天数

		let preLeftDay = new Date(year,month-1,1).getDay();//当前月第一天星期,对应前面加上月天数
		//计算上月
		for(var i = 0;i < preLeftDay;i++){
			daysInCalendar.unshift({type:"pre",value:pLength});
			pLength--;
		}
		//计算当前月
		for(var i = 1;i <= mLength;i++){
			daysInCalendar.push({type:"current",value:i});
		}
		//计算下月
		let rest = 42 - preLeftDay - mLength;
		for(var i = 1;i<=rest;i++){
			daysInCalendar.push({type:"next",value:i});
		}
		return daysInCalendar;
	}
	render() {
		let {year,month,date} = this.props;
		let days = this.getCalendar(year,month);
		let dayList = [];

		let activeInCal = ( year==this.props.configDate.getFullYear() && month==this.props.configDate.getMonth()+1);//判断active是否在当前日历也
		days.forEach((day,index)=>{
			switch(day.type){
				case "pre":
					dayList.push(<li className="not-belong" onClick={this.props.selectDate.bind(this,"pre")} key={index}>{day.value}</li>);break;
				case "next":
					dayList.push(<li className="not-belong" onClick={this.props.selectDate.bind(this,"next")} key={index}>{day.value}</li>);break;
				case "current":
					dayList.push(
						<li className={(day.value==date && activeInCal) ? "active" : ""} key={index} onClick={this.props.selectDate.bind(this,"current")}>{day.value}</li>
					);
					
					break;
				default:break;
			}
		})
		return (
			<div className="calendar-body">
				<ul>{dayList}</ul>
			</div>
		);
	}
}

export default CalendarBody;