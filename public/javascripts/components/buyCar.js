/**
 * 本组件用于右侧拉伸购物车
 * 本组件需配合shop.css共同使用
 * 
 */
	let havClass=[];
	let BuyCar=React.createClass({
		getInitialState: function(){
	        return {
	        	switchs: 'buyFast',
	        	datas:this.props.datas
	        }
	    },
	    Switch:function(){
			if(this.state.switchs==="buyFast"){
				 this.setState({switchs: "buyFast buyFastOpen"});
			}else{
				this.setState({switchs: "buyFast"});
			}
		},
		render:function(){
			return (<div className={this.state.switchs}>
						<div className="buyToolbar">
							<div className="buyToolbarPanels">
								<Panel ref={(panel)=>{this.getMethod=panel}} datas={this.state.datas} updata={this.updata.bind(this)} ></Panel>	
							</div>
							<div className="buyToolbarTabs">
								<FunLabel Switch={this.Switch.bind(this)}></FunLabel>
							</div>
						</div>
					</div>			
			)
			
		},
		updata:function(data){
			let dtds = $.Deferred();
			this.setState({datas: data},function(){
				dtds.resolve();
			});
			return dtds;
		},
		count:function(num,price){
			this.getMethod.count(num,price);
		},
		InitializationData:function(num,price){
			this.getMethod.InitializationData(num,price);
		}
		
		
	})
	let FunLabel=React.createClass({
		getInitialState: function(){
	        return {
	        	color:"#ddd"
	        }
	    },
		render:function(){
			return (<div className="buyToolbarTabsTab" onClick={this.beClick} >
						<i className="iconfont TabIco" style={{color:this.state.color}}>&#xe623;
						<span>购物车</span></i>
						<div className="buyToolbarTip">
						√&nbsp;成功加入购物车
						<b></b>
						</div>
					</div>
			)
			
		},
		beClick:function(){
		this.props.Switch();
		if(this.state.color==='#ddd'){this.setState({color:"#9f0b0bcf"})}else{this.setState({color:"#ddd"})}
		}
	})
	let Panel=React.createClass({
		getInitialState: function(){
	        return {
	        	allNum: 0,
	        	allPrice:0,
	        }
	    },
		render:function(){
			return (<div className="Tpanel" >
			
						<h3 className="Tpanelheader">
							<a className="titles">
								<i className="iconfont">&#xe623;</i>
								<span>购物车</span>
							</a>						
						</h3>
						<TpanelInCenter InitializationData={this.InitializationData.bind(this)} num={this.count.bind(this)} datas={this.props.datas} updata={this.props.updata}></TpanelInCenter>
						
						<div className="foot">
							<div className="footNumber"><strong>{this.state.allNum}</strong>件商品</div>
							<div className="footSumPrice">共计:<strong>{this.state.allPrice+'云点'}</strong></div>
							<a className="footButton" onClick={this.submit}>结算</a>
						</div>
					</div>
			)
		},
		count:function(num,price){
			this.setState((old)=>{
				return {allNum: (old.allNum+num),allPrice: (old.allPrice+num*price)}
			});
		},
		InitializationData:function(num,price){
			this.setState({allNum: num,allPrice: price});
		},
		submit:function(){
			window.open(CTX_PATH+"/shop/orders","_self")
		}
		
	})
	let Goods=React.createClass({
		componentWillMount:function(){
			if(this.props.data.num!==undefined){
				havClass=[...havClass,this.props.data];
			}else{
				let s=this.props.data;
				s.num=1;
				havClass=[...havClass,s]; 
			}
		},
		getInitialState: function(){
	        return {
	        	num: this.props.data.num==undefined?1:this.props.data.num,
	        }
	    },
		render:function(){
			
			return   (<div className="buyCarGoods" onMouseEnter={this.mouseIn} id={this.props.data.id}>
						<span className="delGoods"  onClick={this.dele} >×</span>
				        <span className="buyCarGoodsSpan1">
				    		<img src={CTX_PATH+this.props.data.imgUrl} alt={this.props.data.name} />
				    	</span>
				    	<div className="buyCarGoodsPname">
				    		{this.props.data.name}
				    	</div>
				    	<div className="buyCarGoodsPrice">
				    		单价:<strong>{this.props.data.price+'云点'}</strong>
				    	</div>
				    	<div className="buyCarGoodsNum">
				    		<a onClick={()=>this.addNum()} >+</a>
				    		<input type="number" min="0"  value={this.state.num} onChange={this.onChangeFun}/>
				    		<a onClick={()=>this.minusNum()}>-</a>
				    	</div>
				    </div>)
		},
		mouseIn:function(){
			if(this.index===undefined){
				let index;
				for(var i = 0,vlen = havClass.length; i < vlen; i++){ 
					if(havClass[i].uuid == this.props.data.uuid){ 
						index=i;
						break;
						} 
					} 
				this.index=index;
			}	
		},
		addNum:function(){ 
			let num=this.state.num;
		if(this.state.num<this.props.data.storeNum){
			 this.setState((old)=>{
					return {num:(old.num+1)}
				});	
			 this.props.num(1,parseInt(this.props.data.price))
			 havClass[this.index].num=havClass[this.index].num+1
				$.ajax({
					url:CTX_PATH+"/shop/api/cart/update",
					type:'post',
					data:{
						goodsUuid:this.props.data.uuid,
						num:num+1
							},
					success:function(rel){
						if(!rel.error){
							
						}else{
							layer.msg(rel.msg);
						}
					}
				});	
		}		
		
		},
		minusNum:function(){
			let num=this.state.num;

			if(this.state.num>1){
				this.setState((old)=>{
					return {num:(old.num-1)}
				});	
				 this.props.num(-1,parseInt(this.props.data.price))
				 havClass[this.index].num=havClass[this.index].num-1
				 $.ajax({
						url:CTX_PATH+"/shop/api/cart/update",
						type:'post',
						data:{
							goodsUuid:this.props.data.uuid,
							num:num-1
								},
						success:function(rel){
							if(!rel.error){
								
							}else{
								layer.msg(rel.msg);
							}
						}
					});	
			}
			
		},
		onChangeFun:function(e){
			let Fnumber=this.state.num;
			let Lnumber;
			if(typeof e.target.value !== 'int'){
				if(parseInt(e.target.value)>1&&parseInt(e.target.value)<=parseInt(this.props.data.storeNum)){
					Lnumber= parseInt(e.target.value);
				}else if(parseInt(e.target.value)>parseInt(this.props.data.storeNum)){
					Lnumber=parseInt(this.props.data.storeNum);
				}else{
					Lnumber=1;
				}
				this.setState((old)=>{
					return {num:Lnumber}
				});	
				 this.props.num(Lnumber-Fnumber,parseInt(this.props.data.price))
				 havClass[this.index].num=havClass[this.index].num+(Lnumber-Fnumber)
				 $.ajax({
						url:CTX_PATH+"/shop/api/cart/update",
						type:'post',
						data:{
							goodsUuid:this.props.data.uuid,
							num:Lnumber
								},
						success:function(rel){
							if(!rel.error){
								
							}else{
								layer.msg(rel.msg);
							}
						}
					});	
			}
		},
		dele:function(){
			 $.ajax({
					url:CTX_PATH+"/shop/api/cart/remove",
					type:'post',
					data:{
						goodstUuid:this.props.data.uuid,
							},
					success:function(rel){
						if(!rel.error){
							
						}else{
							layer.msg(rel.msg);
						}
					}
				});	
			havClass.splice(this.index,1);
			this.props.num(-this.state.num,parseInt(this.props.data.price))
			let result = this.props.updata([]);
			result.done(()=>{
				this.props.updata(havClass);
				havClass=[];
			})
		},
		  componentWillUnmount: function() {  
	        },
	})
	
	let TpanelInCenter=React.createClass({
		
		componentWillMount:function(){
			let sum=0,price=0,dom;		
			this.props.datas.map((data,index)=>{
				sum+=parseInt(data.num);
				price+=parseInt(data.num)*parseInt(data.price)
			})
			this.props.InitializationData(sum,price);
		},
		render:function(){
			return (<div className="TpanelMain">
						<div className="TpanelMaincontent" >
							<div className="TpanelMainTip" >
								<span>您可以直接添加物品到购物车内</span>
							</div>							
			               {
			            	   this.props.datas.length==0?(<div className="TpanelMainTipbox" >
				                购物车空空的，赶快去挑选心仪的商品吧~
								</div>):this.props.datas.map((data,index)=>{
			    				return  <Goods updata={this.props.updata} num={this.props.num} key={"goods-"+index} data={data}></Goods>
			    			})
			    			}
						</div>
					</div>)
		}
	})
	function buyToolbarTip(){
		$(".buyToolbarTip").stop().fadeIn(0,()=>{
			setTimeout('$(".buyToolbarTip").fadeOut(1000)',3000)
				});
	}
	
	/*$(document).on("click",".buyToolbarTabsTab",function(){
		if(havClass.hasClass('buyFastOpen')){
			havClass.removeClass('buyFastOpen');
		}else{
			havClass.addClass('buyFastOpen');
		}
	})*/