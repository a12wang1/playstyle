/**
 * 本组件用于轮播
 * 使用本组件前，必须先导入jqurey和unslider插件
 */
let roundSowingData;
	let RoundSowing=React.createClass({
		 
		componentWillMount:function(){
			roundSowingData=this.props.datas.map(function(data,index){	
				let sty={backgroundImage:'url('+data.imgUrl+')'};
				return <li key={"roundSowing-"+index} className="home-banner-1" style={sty} onClick={()=>this.hrefTo(data.targetUrl,data.type)}>
					 		
						</li>
			}.bind(this));
			},
		componentDidMount:function(){
			var unslider = $('.banner').unslider({
				speed : 500, //  The speed to animate each slide (in milliseconds)
				delay : 7000, //  The delay between slide animations (in milliseconds)
				complete : function() {
				}, //  A function that gets called after every slide animation
				keys : true, //  Enable keyboard (left, right) arrow shortcuts
				dots : true, //  Display dot navigation

			});

			$('.unslider-arrow').click(function() {
				var fn = this.className.split(' ')[1];
				//  Either do unslider.data('unslider').next() or .prev() depending on the className
				unslider.data('unslider')[fn]();
			});	
		},
		render:function(){
			
			return <div className="content home-content">
						<div className="banner">
						 	<ul>
						 	{roundSowingData}
						 	</ul>
						</div>
					</div>	
			
			
		},
		hrefTo:function(url,type){
			if(type==1){
				window.open(url)
			}else{
				window.open(url)
			}
		}
		
})
 
