/**
 * 这是表格组件
 * 此组件需加载shopOrders.css
 * 此组件数据格式为WatchHead=[{name:"图片",width:"80",field:"imgurl",formatter:forma1},
           {name:"名称",width:"200",field:"nichen"},
           {name:"单价",width:"80",field:"price"},
           {name:"数量",width:"150",field:"num"},
           {name:"总计",width:"80",field:"TotalPrice"}],
    data=[{id:"1",imgurl:"http://csc.ruijie.com.cn:9088/commodity/115_0.png",nichen:"PowerCube魔方插座",num:1,price:"370",getNum:"12",type:"1"},
           {id:"2",imgurl:"http://csc.ruijie.com.cn:9088/commodity/113_0.png",nichen:"保温杯",num:1,price:"150",getNum:"12",type:"1"}];
    WatchButtom={bottom:true,pagination:false,pageSize:"2",custom:forma4,parameter:["strike"],getFunction:forma2};

 let forma1=(data,rel)=>{
	return <img src={data[rel.field]} style={{height:"50",width:"50"}} />
}
let forma4=(that)=>{
	let s=strike();
	return (<div className="strikeAndButton">
							<div className="SABspan">
							总计&nbsp;:&nbsp;&nbsp;
								<strong>{s}云点</strong>
								<div className="footButton" style={{top:"-7",backgroundColor:'rgba(255, 165, 0, 0.83)' }}>结算</div>
							</div>
						</div>)
}
let forma2=(that)=>{
	if(that.state.strike===strike()){
		return 
	}else{
		that.setState({strike:strike()});	
	}
}
 *其中WatchHead为表头表现数据data为显示数据数据格式WatchButtom为底部表现数据。
 *
 *表头参数解释：name（列表头显示文字）*，width（列宽）*，field（列数据参数，与数据格式参数一一对应）*，formatter（是否格式化自定义显示内容）  注：带*是必须参数
 *
 *底部参数解释：bottom:是否显示底部（true/false）,pagination:是否分页（true/false）;pageSize:每页容量（pagination为true时必须设置）;
 *custom:底部自定义表现方法，一个参数（this），返回一个底部reactDom对象会在底部表现出来;parameter:自定义state;getFunction:自定义方法一个参数（this），可以从react元素上调用changestate方法来调用它 
 *
 *forma1方法第一个参数代表行数据，第二个参数代表列表头数据	第3个参数this
 *
 *forma2,forma4都只有一个参数（this）,forma4是返回一个reactDom对象的表现函数，forma2是自定义函数，不会被自主调用，但是可以通过changestate来调用它
 */

let MyTable=React.createClass({
	getInitialState: function(){
		let s=this.props.WatchButtom.parameter;
		if(s===""||s===undefined){
			return null;
		}else{
			const z=s.length;
			let k={};
			for(let i=0;i<z;i++){
				if(s[i]!==""){
					k[s[i]]="i have not be Initialization";
				}
			}
			s=k;
		}
		if(this.props.WatchButtom.pagination){
			s.page=1
}
    return s
	},
	render:function(){
		let WatchHead=this.props.WatchHead;
		let	data=this.props.data;
		let WatchButtom=this.props.WatchButtom;		
		let width="0";
		let page,total_page;
		if(WatchButtom.pagination){
		total_page=Math.ceil(data.length/parseInt(WatchButtom.pageSize))
		page=this.state.page
		}	
		return (
			<div>	
				<div className="tableBody">
					{
						/*arr.slice(0,slice)*/
						WatchHead.map((rel,index)=>{
							width=addNum(addNum(rel.width,width),"2")
							return <div key={rel.name} className="WatchHead" style={{width:rel.width}}>{rel.name}</div>
						})
					}
					
				</div>
				
				<div className="tableBody dabody">
					{
						WatchButtom.pagination?data.slice((page-1)*WatchButtom.pageSize,page*WatchButtom.pageSize).map((rel,index)=>{
							return <MyTableItem key={rel.id||rel.uid} WatchHead={WatchHead} data={rel}/>
						}):data.map((rel,index)=>{
							return <MyTableItem key={rel.id||rel.uid} WatchHead={WatchHead} data={rel}/>
						})
						
						}
					
				</div>
				{
					WatchButtom&&WatchButtom.bottom&&(
							<div className="tableBody">
							<div className="strike" style={{width:width}}>
							{WatchButtom.pagination&&(<div>
								<a onClick={this.first}><div className="first_page" ></div></a>
								<a onClick={this.previous}><div className="previous_page"></div></a>
								<span>Page</span>
								<input type="number" min="0" value={this.state.page}/>
								of {total_page}<span></span>
								<a onClick={this.next}><div className="next_page"></div></a>
								<a onClick={this.last}><div className="last_page"></div></a>
								</div>)}
								{
									WatchButtom.custom&&WatchButtom.custom(this)
								}
								</div>
						</div>		
					)
				}
			</div>	
		)
	},
	changestate:function(){
		this.props.WatchButtom.getFunction(this);
	},
	first:function(){
		this.setState({page:1})
	},
	previous:function(){
		if(this.state.page<=1){
			return;
		}
		this.setState((old)=>{
			return {page:old.page-1}
		})
	},
	next:function(){
		if(this.state.page>=Math.ceil(this.props.data.length/parseInt(this.props.WatchButtom.pageSize))){
			return;
		}
		this.setState((old)=>{
			return {page:old.page+1}
		})
	},
	last:function(){
		this.setState({page:Math.ceil(this.props.data.length/parseInt(this.props.WatchButtom.pageSize))})
	},
});
let MyTableItem=React.createClass({	
	getInitialState: function(){
		let WatchHead=this.props.WatchHead;
		let s="";
		for(let i=0;i<WatchHead.length;i++){
			if(WatchHead[i].parameter){
				s+=(WatchHead[i].parameter.join(","))
				s+=","
			}
		}
		if(s===""){
			return null;
		}else{
			s = s.split(",")
			const z=s.length;
			let k={};
			for(let i=0;i<z;i++){
				if(s[i]!==""){
					k[s[i]]="i have not be Initialization";
				}
			}
			s=k;
		}
    return s;
	},
	render:function(){
		let WatchHead=this.props.WatchHead;
		let	data=this.props.data;
		return (
				<div>
					{WatchHead.map((rel,index)=>{
						return <div key={rel.name} style={{width:rel.width}} className={"LisItem LisItem"+index}>{
							rel.formatter?rel.formatter(data,rel,this):data[rel.field]
						}</div>
						})}						
				</div>
		)
	}
});

function addNum (num1, num2) {
 var sq1,sq2,m;
 try {
  sq1 = num1.toString().split(".")[1].length;
 }
 catch (e) {
  sq1 = 0;
 }
 try {
  sq2 = num2.toString().split(".")[1].length;
 }
 catch (e) {
  sq2 = 0;
 }
 m = Math.pow(10,Math.max(sq1, sq2));
 return (num1 * m + num2 * m) / m;
};
function strike(){
	let num=0;
	for(let i=0;i<$(".LisItem4").length;i++){
		num+=parseInt($(".LisItem4").eq(i).html())
	}
	return num;
}
