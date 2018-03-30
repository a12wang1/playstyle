/**
 * 本组件用于商品展示（类淘宝方块商品展示风格）
 * 本组件需配合shop.css共同使用
 */	
	let Commodity =React.createClass({
		
		render:function(){
			let data=this.props.data;
			console.log(data)
			return (<div id={data.id} className="h_body_commodity" style={{marginRight:10}} onClick={this.toOrdersDetail}>
							<img className="h_body_commodity_img" src={CTX_PATH+data.imgUrls[0]} />
							<div className="addBuyCar" onClick={this.addBuyCar}><i className="iconfont" >&#xe623;</i>加入购物车</div>
							<div className="h_body_commodity_name">{data.name}</div>
							<p className="h_body_commodity_price">
								<span className="h_body_commodity_other">超值价:</span>
								{data.price}
								<span className="h_body_commodity_other">&nbsp;云点</span>
							</p>
							<div className="h_body_commodity_hr"></div>
							<p className="h_body_commodity_buy">已有<span style={{color: '#3c96e9'}}>{data.saleNum}</span>人兑换</p>
							<a className='buyButton'>立即兑换</a>
						</div>
						)
			
		},
		addBuyCar:function(e){
			let cs=this.props.data;
			let s={id:cs.id, imgSrc: cs.imgSrc, name:cs.name, price:cs.price, getNum:cs.saleNum,Nnum:cs.Nnum};
			addNewBuy(s);
			buyToolbarTip();
			e.stopPropagation()
		},
		toOrdersDetail:function(){
			window.open("./goods/detail?uuid="+this.props.data.id,"_self")
		}
	});
	
	let CommodityBody =React.createClass({
		 getInitialState: function() {
	          return {datas: this.props.datas||"",
	          };
	        },
		render:function(){
			let setInDom;
			if(this.state.datas===""||this.state.datas.length===0){
				setInDom=<div className="noBuyThing">当前分类下暂无商品,请选择其他分类</div>
			}else{
				setInDom=this.state.datas.map(function(data,index){
					return (<Commodity data={data} key={"commodity-"+index}></Commodity>)
				})
			}
			return (
					<div style={{ width: '100%', marginTop: 20,zIndex:1100}}>
						<Labelbuy lables={this.props.lables} upData={this.upData.bind(this)}></Labelbuy>
						{setInDom}
					</div>
					)
		},
		upData:function(url,data){
			$.ajax({
				url:url,
				data:data,
				dataType:"json",
				type:"POST",
				success:rel=>{
					if(!rel.error){
						++pageNum;
						getCommodityData=rel.data.list;
						this.setState({datas: rel.data.list})
					}
				},
				error:(xhl,e,err)=>{
					console.log(err.toString())
				}
			});	
		},
		aloadingMore:function(data){
			this.setState({datas: data},()=>{finished=true});
		}
	});
	let Labelbuy=React.createClass({
		render:function(){
			let dats={name:"全部",uuid:undefined},dat2s={name:"销量排序",uuid:undefined,saleDesc:true}
			return (<div className="labBody">
							<span className="labTitle" onClick={this.buttonClick}>筛选</span>
							<div className="labButtonDiv">
							<LabelButter upData={this.props.upData} data={dats} ></LabelButter>
							<LabelButter upData={this.props.upData} data={dat2s} ></LabelButter>						
								{
									this.props.lables.map((rel,index)=>{
										return <LabelButter upData={this.props.upData} data={rel} key={"lableButter-"+index}></LabelButter>
									})
								}
								
							</div>
							<input type="text" placeholder="请输入商品名称" className="searchInputs" onKeyDown={this.search}/>
							<div className="intervalDiv" >价格:&nbsp;
								<input ref={(ref)=>this.priceMin=ref} type="number" placeholder="￥"  className="searchInputs" />&nbsp;&nbsp;~&nbsp;&nbsp;
								<input ref={(ref)=>this.priceMax=ref} type="number" placeholder="￥" className="searchInputs" />
								<button className="buyButton" onClick={this.returnIn}>确定</button>
							</div>
						</div>)	
		},
		search:function(e){
			if(event.keyCode==13){
				const s1={pageNum:1,pageSize:100,name:$(e.target).val()}
				this.props.upData(CTX_PATH+"/shop/api/goods/page",s1)		
			}
		},
		returnIn:function(){
			const [s1,s2]=[$(this.priceMin).val(),$(this.priceMax).val()];
			if(isNaN(parseInt(s1))||isNaN(parseInt(s2))){
				layer.msg("请输入正确的数值在输入框内（只支持数字）");
			}else if(parseInt(s1)>parseInt(s2)){
				layer.msg("请输入正确的数值（左小右大）");
			}else{
				pageNum=1;finished=true;WindowUuid=undefined,priceMin=parseInt(s1),priceMax=parseInt(s2);
			const z1={pageNum:pageNum,pageSize:pageSize,priceMin:parseInt(s1),priceMax:parseInt(s2)}
			this.props.upData(CTX_PATH+"/shop/api/goods/page",z1)
			}
			
		}
	})
	let LabelButter=React.createClass({
		render:function(){
			
			return (<div ref={(refzs)=>this.refzs=refzs} className="labButton" onClick={this.beClick}>
							{this.props.data.name}
					</div>)	
		},
		beClick:function(){
			changeColor("labButton","labButtonBeClick",this.refzs);
			pageNum=1;WindowUuid=this.props.data.uuid;finished=true,priceMin=undefined,priceMax=undefined;;
			const s1={pageNum:pageNum,pageSize:pageSize,categoryUuid:WindowUuid,saleDesc:this.props.data.saleDesc}
			this.props.upData(CTX_PATH+"/shop/api/goods/page",s1)
		}
	})
	function changeColor(classNa,toggleClass,that){
		$("."+classNa).removeClass(toggleClass);
		$(that).addClass(toggleClass);	
	}