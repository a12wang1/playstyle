let forma1=(data,rel)=>{
	return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>{
		data.goods.map((a,index)=>{
		return <img src={CTX_PATH+a["imgUrls"]} style={{height:"50",width:"50",marginLeft:'12.5'}} />
	})
	}		
	</div>
}
let forma2=(data,rel)=>{
	return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>{
		data.goods.map((a,index)=>{
		return <span  style={{height:"50",lineHeight:"50px"}} >{a.name}</span>
	})
	}		
	</div>
}

let forma3=(data,rel)=>{
	return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>{
		data.goods.map((a,index)=>{
		return <span  style={{height:"50",lineHeight:"50px"}} >{a.num}</span>
	})
	}		
	</div>
}
let forma4=(data,rel)=>{
	return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>{
		data.goods.map((a,index)=>{
		return <span  style={{height:"50",lineHeight:"50px"}} >{a.price}</span>
	})
	}		
	</div>
}
let forma5=(data,rel)=>{
	let allNum=0;

	if(data.state===1||data.state===5){
		allNum="未支付"
	}else{
		for(let s=0;s<data.goods.length;s++){
		allNum+=parseInt(data.goods[s].num)*parseInt(data.goods[s].price);
	}
	}
	
	return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length,color:"#f00"}}>
			{allNum}
	</div>
}
let forma6=(data,rel)=>{
	
	return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
			{data[rel.field]}
	</div>
}
let forma8=(data,rel)=>{
	
	return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length,display:'block',lineHeight:55*data.goods.length+"px"}}>
			{data[rel.field]}
	</div>
}
let forma9=(data,rel)=>{
	if(data.state===1){
		return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
			<div><a className="orderB" style={{}}>未支付</a></div>
	</div>
	}else if(data.state===2){
		return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
			<div><a className="orderB" style={{}}>待发货</a></div>
	</div>
	}else if(data.state===3){
		return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
			<div><a className="orderB" style={{}}>待收货</a>
			<a className="orderA" onClick={()=>{layer.open({
				  title: '查看物流'
					  ,content: "快递公司:"+data.express+"<br/>快递物流单号为:"+data.expressNo
					}); }} style={{}}>查看物流</a></div>
	</div>
	}else if(data.state===4){
		return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
			<div><a className="orderB" style={{}}>已收货</a></div>
	</div>
	}else if(data.state===5){
		return <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
			<div><a className="orderB" style={{}}>已取消</a></div>
	</div>
	}
	
}
let forma7=(data,rel,that)=>{
	if(data.state===1){
		return  <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
					<div><button onClick={()=>{payOrder(data.uuid)}} className="orderButton">支付</button>
					<button onClick={()=>{offOrder(data.uuid)}} className="orderButton">取消订单</button>
				</div></div>
	}else if(data.state===2){
		return  <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
		<div><a onClick={()=>{addBuyCarToo(data)}} className="orderA">再次购买</a>
		{/*<a className="orderA">催发货</a>*/}</div>
	</div>
	}else if(data.state===3){
		return  <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
		<div><a onClick={()=>{addBuyCarToo(data)}} className="orderA">再次购买</a>
		<a onClick={()=>{confirmGetGoods(data.uuid)}} className="orderA">确认收货</a></div>
	</div>
	}else if(data.state===4){
		return  <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
		<div><a onClick={()=>{addBuyCarToo(data)}} className="orderA">再次购买</a></div>
	</div>
	}else if(data.state===5){
		return  <div className="ordersAllItems broderMid" style={{height:55*data.goods.length}}>
		<div><a onClick={()=>{addBuyCarToo(data)}} className="orderA">重新购买</a></div>
	</div>
	}
}
let BB,isLogin="inline-block",detailTopNavs,data1=[{mainUrl:"../../home",name:"平台首页",data:[{url:"https://www.teraee.com/?page_id=36090",name:"最新资讯"},
                                                              {url:CTX_PATH+'/solution',name:"申请产品试用"},
                                                              {url:"https://www.teraee.com/?page_id=37047",name:"在线演示"}]},
                                    {mainUrl:"../home",name:"商品首页"},
                                    {mainUrl:"../address",name:"地址管理"}],
data2=[{name:"图片",width:"80",field:"img",formatter:forma1},
       {name:"名称",width:"200",field:"nichen",formatter:forma2},
       {name:"单价",width:"80",field:"price",formatter:forma4},
       {name:"数量",width:"50",field:"num",formatter:forma3},
       {name:"实付款",width:"80",field:"TotalPrice",formatter:forma5},
       {name:"收货人",width:"80",field:"receiver",formatter:forma6},
       {name:"地址",width:"250",field:"address",formatter:forma8},
       {name:"订单号",width:"150",field:"seqNo",formatter:forma6},
       {name:"交易状态",width:"100",field:"do",formatter:forma9},
       {name:"交易操作",width:"100",field:"do",formatter:forma7}
       ],
WatchButtom={bottom:true,pagination:true,pageSize:"10",parameter:["strike"]};
(function (){
	$.ajax({
		url:CTX_PATH+"/shop/api/cart/goods/page",
		type:'post',
		data:{
			pageNum:"1",
			pageSize:"100"
				},
		success:function(rel){
			if(!rel.error){
				BB=ReactDOM.render(		
						<BuyCar datas={rel}></BuyCar>,
						document.getElementById("buyCarInRight")
				)
			}else{
				layer.msg(rel.msg);
			}
		}
	});
	
})();
(function(){
	detailTopNavs = ReactDOM.render(
			<HomeTopNav></HomeTopNav>,
			document.getElementById('TopNav')
	);
	$.ajax({
		url:CTX_PATH+'/user/isLogin',
		type:'post',
		success:function(rtn){
			if(!rtn.error){
				detailTopNavs.setState({login:rtn.data});
				
			}else{
				layer.msg(rtn.msg);
			} 
		}
	});
	
})();
(function(){
 	ReactDOM.render(			
		<SidebarNav data={data1}></SidebarNav>,
		document.getElementById("addressSidebarNav")
		)
})();
function orderList(state,keyword){
	$.ajax({
		url:CTX_PATH+"/shop/api/order/page",
		type:'post',
		data:{
			pageNum:1,
			pageSize:100,
			state:state,
			keyword:keyword
		},
		success:function(rel){
			if(!rel.error){
					ReactDOM.render(			
		<MyTable WatchHead={data2} data={rel} WatchButtom={WatchButtom}></MyTable>,
		document.getElementById("orderTable")
		)
			}else{
				layer.msg(rel.msg);	
			}
		
		}
	});
 	
}
orderList();
$(".chooseDd li").on("click",function(){
	$(".chooseDd li").removeClass("beChose");
	$(this).addClass("beChose");
	orderList($(this).children("a").attr("name"));
})
$("#search").on("click",function(){
	orderList("",$("#searchInput").val())
})
function offOrder(uuid){
	$.ajax({
		url:CTX_PATH+"/shop/api/order/cancel",
		type:'post',
		data:{
			orderUuid:uuid
		},
		success:function(rel){
			if(!rel.error){
				layer.msg("取消订单成功！");
				orderList($(".beChose").children("a").attr("name"))
			}else{
				layer.msg(rel.msg);
			}
		}
	});
}
function confirmGetGoods(uuid){
	$.ajax({
		url:CTX_PATH+"/shop/api/order/finish",
		type:'post',
		data:{
			orderUuid:uuid
		},
		success:function(rel){
			if(!rel.error){
				layer.msg("确认收货成功！");
				orderList($(".beChose").children("a").attr("name"))
			}else{
				layer.msg(rel.msg);
			}
		}
	});
}
function payOrder(uuid){
	$.ajax({
		url:CTX_PATH+"/shop/api/order/pay",
		type:'post',
		data:{
			orderUuid:uuid
		},
		success:function(rel){
			if(!rel.error){
				layer.msg("支付成功！");
				orderList($(".beChose").children("a").attr("name"))
			}else{
				layer.msg(rel.msg);
			}
		}
	});
}
function addBuyCarToo(data){
	let s=0
	for(let i=0;i<data.goods.length;i++){
		$.ajax({
			url:CTX_PATH+"/shop/api/cart/add",
			type:'post',
			data:{
				goodsUuid:data.goods[i].id,
				num:data.goods[i].num
			},
			success:function(rel){
				if(!rel.error){
					BB.count(data.goods[i].num,data.goods[i].price)
					if((i+1)===data.goods.length&&s===0){
						let result = BB.updata([]);
						havClass=[];
						result.done(()=>{
							getNewBuyData()
						})		
						layer.msg("添加到购物车成功！");
						buyToolbarTip();
					}
				}else{
					s=1;
					layer.msg(rel.msg);
				}
			}
		});
		
	}
}
function getNewBuyData(){
	$.ajax({
		url:CTX_PATH+"/shop/api/cart/goods/page",
		type:'post',
		data:{
			pageNum:"1",
			pageSize:"100"
				},
		success:function(rel){
			if(!rel.error){
				BB.updata(rel)
			}else{
				layer.msg(rtn.msg);
			}
		}
	});	
}