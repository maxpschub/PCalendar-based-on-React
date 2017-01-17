# PCalendar-React
React重构日历组件

##使用
###配置格式
```
import PComponent from './components/calendar-react.js';
render(
	<PComponent date={new Date()} />,
	document.getElementById("cal")
);
```
##使用React心得:
1、使用setState方法更新状态是异步过程，若要操作状态需要设置回调：<br>
```
this.setState({year:year},callback);
```
2、propTypes和defaultProps不可忽略；<br>
3、render方法里：不可修改state，放置根据state渲染页面的逻辑，复用多的方法放在外面（即class方法）；<br>
4、注意ES6新语法糖的妙用，如`...`,`=>`,`map()`,模板字符串等；<br>
