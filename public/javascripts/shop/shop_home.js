/**
 * 首页顶部导航栏
 */


let homeTopNavs,isLogin="inline-block",getTypeData=[],getCommodityData;
function HomeTopNavs(){
	homeTopNavs = ReactDOM.render(
			<HomeTopNav></HomeTopNav>,
			document.getElementById('head')
	);
	$.ajax({
		url:'/user/isLogin',
		type:'post',
		success:function(rtn){
			console.log('is login data:%o',rtn);
			if(!rtn.error){
				homeTopNavs.setState({login:rtn.data});
				isLogin="none";
			}else{
				layer.msg(rtn.msg);
			}
		}
	});
}

function RendRs(){
	$.ajax({
		url:"/shop/api/banners",
		type:'post',
		success:function(rtn){
			console.log(rtn);
			if(!rtn.error){
				ReactDOM.render(
					<RoundSowing datas={rtn.data}></RoundSowing>,
					document.getElementById("round"),
				)
			}
			
		}
	});
	
	
}

let AA,pageNum=1,pageSize=8,BB,data1=[{mainUrl:"../home",name:"平台首页"},
                  {mainUrl:"./order/detail",name:"我的订单"},{mainUrl:"./address",name:"地址管理"}
                  ];
const getType=new Promise((resolve, reject) =>{
	$.ajax({
		url:"/shop/api/category/all",
		type:'post',
		success:function(rel){
			if(!rel.error){
				resolve(rel.data);
			}
		}
	});
})
const getCommodity=new Promise((resolve, reject) =>{
	$.ajax({
		url:"/shop/api/goods/page",
		type:'post',
		data:{
			pageNum:pageNum,
			pageSize:pageSize
				},
		success:function(rel){
			if(!rel.error){
				++pageNum;
				resolve(rel);
			}
		}
	});
})
function ADDcommodity(){
	Promise.all([getType, getCommodity]).then(function (rel) {

		for(let i=0;i<rel[0].length;i++){
			getTypeData=getTypeData.concat(rel[0][i].childs);
		}
		getCommodityData=rel[1];	
		AA=ReactDOM.render(
				<CommodityBody datas={getCommodityData} lables={getTypeData}></CommodityBody>,
				document.getElementById("commodity"),
		)	});
	
}

function AddBuyCar(){
	$.ajax({
		url:"/shop/api/cart/goods/page",
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
}
let finished = true,WindowUuid,priceMin,priceMax;
$(window).scroll(function() {
	if($("body").get(0).scrollHeight-$(window).height()-$(this).scrollTop()<30&&finished){
		finished=false
		$.ajax({
			url:"/shop/api/goods/page",
			type:'post',
			data:{
				pageNum:pageNum,
				pageSize:pageSize,
				categoryUuid:WindowUuid,
				priceMin:priceMin,
				priceMax:priceMax
					},
			success:function(rel){
				console.log(rel)
				if(!rel.error){
					if(rel.length>0){
						++pageNum;
					getCommodityData=getCommodityData.concat(rel);
					AA.aloadingMore(getCommodityData);
					}
				}
			}
		});
	}
	});
function addNewBuy(data){
	
		$.ajax({
			url:"/shop/api/cart/add",
			type:'post',
			data:{
				goodsUuid:data.id,
				num:1
					},
			success:function(rel){
				if(!rel.error){
					layer.msg("成功加入购物车！");
					BB.count(1,data.price)
					let result = BB.updata([]);
					havClass=[];
					result.done(()=>{
						getNewBuyData()
					})		
					}else{
					layer.msg(rel.msg);
				}
			}
		});
		/*//下架购物车都方法
		let s=havClass;
		havClass=[];
		BB.count(-s[index].Nnum,data[0].price)
		s.splice(index,1);
		let result = BB.updata([]);
		result.done(()=>{
			BB.updata(s)
		})*/
		
		/*let s=havClass;
		havClass=[];
		++s[0].num;
		BB.count(1,data.price)
		let result = BB.updata([]);
		result.done(()=>{
			BB.updata(s)
		})
	*/
}
function getNewBuyData(){

	$.ajax({
		url:"/shop/api/cart/goods/page",
		type:'post',
		data:{
			pageNum:"1",
			pageSize:"100"
				},
		success:function(rel){
			if(!rel.error){
				BB.updata(rel)
				console.log(rel)
			}else{
				layer.msg(rtn.msg);
			}
		}
	});	
}
(function(){
 	ReactDOM.render(			
		<SidebarNav data={data1}></SidebarNav>,
		document.getElementById("SGDsidebarNav")
		)
})();
HomeTopNavs();
RendRs();
ADDcommodity();
AddBuyCar();