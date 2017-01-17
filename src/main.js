import React from "react";
import {render} from 'react-dom';

import PCalendar from './components/calendar.js';
import PComponent from './components/calendar-react.js';

var root = document.getElementById("root");
//原生实现
var cal = new PCalendar({
	target:root,
	date:new Date(2016,0,6),
	type:"show",
	format:format2,
	callback:(date,format) => {
		console.log("选择时间:"+format);
	}
});

function format1(date){//YYYY-MM-DD
	return date.getFullYear()+"-"+~~(date.getMonth()+1)+"-"+date.getDate();
}
function format2(date){//
	return date.getFullYear()+"年"+~~(date.getMonth()+1)+"月"+date.getDate()+"日";
}
//React实现
render(
	<PComponent date={new Date()} format={format1}/>,
	document.getElementById("cal")
);
