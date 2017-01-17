import React, {Component, PropTypes} from 'react';
import Chead from './calendar-head.js';
import Cbody from './calendar-body.js';

import './calendar.scss';

class PCalendar extends Component {
	static propTypes = {
		type:React.PropTypes.oneOf(["show","hide"]),
		callback:React.PropTypes.func,
		format:React.PropTypes.func,
		//date:Date对象需要自己实现,React貌似不支持instanceof(Date)
	}
	static defaultProps = {
		type:"show",
		callback:date => {console.log("callback: "+date);},
		format:date => date.getFullYear()+"-"+~~(date.getMonth()+1)+"-"+date.getDate()
	}
	constructor(props){
		super(props);
		this.state = {
			configDate:this.props.date,
			year:this.props.date.getFullYear(),
			month:this.props.date.getMonth()+1,
			date:this.props.date.getDate(),
			selectCallback:this.props.callback
		}
		this.switchYearMonth = this.switchYearMonth.bind(this);
		this.selectDate = this.selectDate.bind(this);
	}
	switchYearMonth(type,tyear=this.state.year,tmonth=this.state.month,callback){//注意setState是异步执行！！必要时需要指定回调函数
		let {year,month} = this.state;
		if(type){
			if(type=="pre"){
				if(month==1){
					this.setState({year:year-1,month:12},callback);
				}else{
					this.setState({month:month-1},callback);
				}
			}else if(type=="next"){
				if(month==12){
					this.setState({year:year+1,month:1},callback);
				}else{
					this.setState({month:month+1},callback);
				}
			}else{
				throw new Error("switchYearMonth() get a wrong params!");
			}
		}else{//select a specific year or month
			this.setState({year:tyear,month:tmonth},callback);
		}
	}
	selectDate(type,event){
		let date = ~~(event.target.textContent);
		let config = ()=>{
			let configDate = new Date(this.state.year,this.state.month-1,date);
			//callback(format(date))
			this.setState({date:date,configDate:configDate},()=>{ this.props.callback(this.props.format(this.state.configDate))});
		};
		if(type=="pre"){
			this.switchYearMonth("pre",null,null,config);
		}else if(type=="next"){
			this.switchYearMonth("next",null,null,config);
		}else{
			config();
		}
	}
	render() {
		return (
			<div className="calendar">
				<Chead year={this.state.year} month={this.state.month} 
					switchYearMonth={this.switchYearMonth} />
				<Cbody year={this.state.year} month={this.state.month} date={this.state.date} 
					configDate={this.state.configDate} 
					selectDate={this.selectDate} />
			</div>
		);
	}
};


export default PCalendar;