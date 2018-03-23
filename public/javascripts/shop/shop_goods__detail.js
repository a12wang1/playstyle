/**
 * 商品多图点击展示页面
 */
let ImgShowInFrame=React.createClass({
	getInitialState: function(){
        return {
        	bigFrame:0,
        	scroll:0
        }
    },
	render:function(){
		const imgs=this.props.datas;
		return (
				<div className="imgShowBody">
					<div className="bigFrame">
						<img src={CTX_PATH+imgs[this.state.bigFrame]} />
					</div>
					<div className="smallFrames">
						<a onClick={this.move} className="smallFramesA1"  style={{display:imgs.length>5?"block":"none"}}>
							<i className="iconfont icon-left"></i>
						</a>
						<a onClick={this.move} className="smallFramesA2" style={{display:imgs.length>5?"block":"none"}}>
							<i className="iconfont icon-right"></i>
						</a>
						<div className="smallFramesAllFrame">
							<ul style={{left:this.state.scroll*54+"px"}}>
							{
								imgs[0]&&imgs.map((url,index)=>{
									return <li><img style={index===this.state.bigFrame?{border:"2px solid #e53e41"}:{}} src={CTX_PATH+url} name={index} onClick={this.choose} key={"frameImg-"+index} /></li>
								})
							}
							</ul>
						</div>
					</div>
				</div>
				)
	},
	choose:function(e){
		const target=e.target.name;
		this.setState({bigFrame:parseInt(target)})
	},
	move:function(e){
		const length=this.props.datas.length;
		const multiplier=e.target.getAttribute("class")==="iconfont icon-left"?1:-1;
		if(this.state.scroll>=0&&multiplier===1){
			return;
		}
		if(this.state.scroll<=5-length&&multiplier===-1){
			return;
		}
		this.setState((old)=>{
			return {scroll:old.scroll+multiplier};
		})
	}
});

let ThegoodsBuy=React.createClass({
	getInitialState: function(){
        return {
        	num:1,
        }
    },
	render:function(){
		let data=this.props.datas;
		return (
				<div className="rightGoodsBody">
					<div className="rightGoodsTitle">{data.descripetion}</div>
					<div className="rightGoodsPrice">
						<span>{data.price}</span>
						<i>云点</i>
					</div>
					<div className="rightGoodsHr"></div>
					<div className="rightGoodsNum">
						<span>已兑换数：{data.saleNum}&nbsp;&nbsp;丨&nbsp;&nbsp;剩余数量：{data.storeNum}</span>
					</div>
					<div className="rightGoodsCount">
						<div id="cut" onClick={this.numChange}>-</div>
						<input type="number" min="0" value={this.state.num} onChange={this.numInput}/>
						<div id="add" onClick={this.numChange}>+</div>
					</div>
					<div className="rightGoodsButton">
						<div onClick={this.nowBuy}>立即兑换</div>
						<div className="rightGoodsbuyButton" onClick={this.addBuyCar}>添加购物车</div>
					</div>
				</div>
		)
	},
	numInput:function(e){
		let value=parseInt(e.target.value);
		const maxValue=parseInt(this.props.datas.storeNum);
		value=value&&value>=0?value:0
		value=value<=maxValue?value:maxValue;
		this.setState({num:value});
	},
	numChange:function(e){
		const sum=(e.target.id==="add"?1:-1)+this.state.num;
		const maxValue=parseInt(this.props.datas.storeNum);
 		if(sum<=maxValue&&sum>=0){
			this.setState((state)=>{
			return {num:sum}
		});
		}
		return;
	},
	addBuyCar:function(){
		$.ajax({
			url:CTX_PATH+"/shop/api/cart/add",
			type:'post',
			data:{
				goodsUuid:this.props.datas.uuid,
				num:1
					},
			success:(rel)=>{
				if(!rel.error){
					layer.msg("成功加入购物车！");
					buyToolbarTip();
					BB.count(1,this.props.datas.price)
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
	},
	nowBuy:function(){
		const url="uuid="+this.props.datas.uuid+"&num="+this.state.num
		window.open("../orders?"+url,"_self")
	}
})
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
				BB.updata(rel.data.list)
			}else{
				layer.msg(rtn.msg);
			}
		}
	});	
}
let GoodsDetail=React.createClass({
	render:function(){
		return <div className="goodsDetailBody">
						<ImgShowInFrame datas={this.props.data1}/>
						<ThegoodsBuy datas={this.props.data2}/>				
						<DescripetionDiv data={this.props.data2.descripetion}/>
				</div>
	}
})

let DescripetionDiv=React.createClass({
	getInitialState: function(){
        return {
        	choose:1,
        }
    },
	render:function(){
		return <div className="descripetionDiv">
					<ul>
						<li className={1===this.state.choose&&'beClickLi'} onClick={()=>{
							this.setState({choose:1});
						}}>商品介绍</li>
					</ul>
					<dd>
						<dt>商品介绍：{this.props.data}</dt>
					</dd>
		</div>
	}
})

let detailTopNavs,BB,data1=[{mainUrl:"../../home",name:"平台首页",data:[{url:"https://www.teraee.com/?page_id=36090",name:"最新资讯"},
                                                                    {url:CTX_PATH+'/solution',name:"申请产品试用"},
                                                                    {url:"https://www.teraee.com/?page_id=37047",name:"在线演示"}]},
                            {mainUrl:"../home",name:"商品首页"},
                            {mainUrl:"../order/detail",name:"我的订单"},{mainUrl:"../address",name:"地址管理"}
                            ];
let isLogin="inline-block";
function detailTopNav(){
	detailTopNavs = ReactDOM.render(
			<HomeTopNav></HomeTopNav>,
			document.getElementById('shopGoodsDetailTopNav')
	);
	$.ajax({
		url:CTX_PATH+'/isLogin',
		type:'post',
		success:function(rtn){
			if(!rtn.error){
				detailTopNavs.setState({login:rtn.data});
				isLogin="none"
			}else{
				layer.msg(rtn.msg);
			}
		}
	});
}
(function AddBuyCar(){
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
						<BuyCar datas={rel.data.list}></BuyCar>,
						document.getElementById("buyCarInRight")
				)
			}else{
				layer.msg(rel.msg);
			}
		}
	});
	
})();
(function(){
 	ReactDOM.render(			
		<SidebarNav data={data1}></SidebarNav>,
		document.getElementById("SGDsidebarNav")
		)
})();

(function(){
	const s=parseURL(window.location.href)
	if(s===undefined||s.uuid===undefined){
    	window.history.back();
    	return;
    }
	$.ajax({
		url:CTX_PATH+"/shop/api/goods/detail",
		type:'post',
		data:s,
		success:function(rel){
			if(!rel.error){
				ReactDOM.render(
						<GoodsDetail data1={rel.data.imgUrls} data2={rel.data}></GoodsDetail>,
						document.getElementById("goodsDetailBody")
				)	
			}else{
				layer.msg(rel.msg);
			}
		}
	});
			
})();

detailTopNav();
function parseURL(url){
    var url = url.split("?")[1];
    if(url===undefined){
    	window.history.back();
    	return;
    }
    var para = url.split("&");
    var len = para.length;
    var res = {};
    var arr = [];
    for(var i=0;i<len;i++){
        arr = para[i].split("=");
        res[arr[0]] = arr[1];
    }
    return res;
}