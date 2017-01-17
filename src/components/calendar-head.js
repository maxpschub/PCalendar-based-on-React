import React, { Component,PropTypes } from 'react';

class CalendarHead extends Component {
	static defaultProps = {
		monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
		dayList:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
	}
	static propTypes = {
		year:PropTypes.number.isRequired,
		month:PropTypes.number.isRequired,
		switchYearMonth:PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.yearChange = this.yearChange.bind(this);
		this.monthChange = this.monthChange.bind(this);
	}

	yearChange(event){
		this.props.switchYearMonth(null,~~(event.target.value),this.props.month);
	}
	monthChange(event){
		this.props.switchYearMonth(null,this.props.year,~~(event.target.value));
	}
	render() {
		let yearList = [this.props.year-2,this.props.year-1,this.props.year,this.props.year+1,this.props.year+2];
		let years = [];
		yearList.forEach((year,index)=>{
			years.push(<option key={index} value={year}>{year}</option>)
		})
		let months = [];
		this.props.monthList.forEach((month,index)=>{
			months.push(<option key={index} value={month}>{month}</option>)
		})
		let weekdays = [];
		this.props.dayList.forEach((day,index)=>{
			weekdays.push(<li key={index} >{day}</li>)
		})
		return (
			<div className="calendar-head">
				<div className="head-top">
					<span className="pre-month" onClick={this.props.switchYearMonth.bind(this,"pre")}>←</span>
					<span className="year">
						<select value={this.props.year} 
							onChange={this.yearChange}>
							{years}
						</select>
					</span>年
					<span className="month">
						<select value={this.props.month} 
							onChange={this.monthChange}>
							{months}
					</select>
					</span>月
					<span className="next-month" onClick={this.props.switchYearMonth.bind(this,"next")}>→</span>
					<ul>{weekdays}</ul>
				</div>
			</div>
		);
	}
}

export default CalendarHead;
