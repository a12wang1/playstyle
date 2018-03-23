//数据格式：[{mainUrl:"",name:"商品首页",data:[{url:"https://www.baidu.com/",name:"百度"}]}]
/**
 * 副导航(菜单导航)
 * 此组件需依据layui框架CSS
 * 上面是数据格式
 */
let SidebarNav = React.createClass({
	render:function(){
		let sideData=this.props.data
		return <ul className='layui-nav'>
					{
						sideData.map((data,index)=>{
							return (<SidebarNavItem key={"sideBar-"+index} data={data}></SidebarNavItem>)
						})
					}
			   </ul>;
	}
});
let SidebarNavItem=React.createClass({
	getInitialState: function(){
        return {
        	show:false
        }
    },
	render:function(){
		let faData=this.props.data;
		let zshow,SideItemdom,Sideicon;
		if(faData.data&&faData.data.length>0){
			zshow=this.state.show;
			SideItemdom=faData.data.map((data,index)=>{
				   return (<dd><a target='_self' href={data.url||"javascript:;"} key={"navItem-"+index}>{data.name}</a></dd>)
				})
			Sideicon=<span className={zshow?"layui-nav-more layui-nav-mored":"layui-nav-more"} ></span>;
			
		}else{
			zshow=false;
		}
		return <li onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} className='layui-nav-item'>
	  				<a  href={faData.mainUrl||"javascript:;"} target='_self'>{faData.name}
	  					{
	  						Sideicon	
	  					}
	  				</a>
						 <dl className={zshow?'layui-nav-child layui-nav-child layui-anim layui-anim-upbit layui-show':'layui-nav-child'}>

	  				{
	  					SideItemdom	
	  				}
					    </dl>

			   </li>
	},
	mouseIn(){
		/*this.setState((old,neW)=>{
			return {show:true,add:old.add+1};
		});
		this.setState((old,neW)=>{
			return {add:old.add+1};
		});*/
		this.setState({show:true})
	},
	mouseOut(){
		this.setState({show: false});
	}
})