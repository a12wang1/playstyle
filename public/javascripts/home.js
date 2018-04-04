

/**
 * 首页顶部导航栏
 */
var HomeTopNav = React.createClass({
	getInitialState: function () {
	    return {
	    	login:false,
	    };
	},
	render:function(){
		var navBars = [];
		var consoleBtn;
		var loginBtn;
		if(this.state.login){
			navBars.push(<NavConsole></NavConsole>);
			navBars.push(<NavCount></NavCount>);
			consoleBtn = <a className='btn-flat navbar-btn' href={CTX_PATH + '/console'}>控制台</a>;
		}else{
			navBars.push(<NavLoginSign></NavLoginSign>);
			loginBtn = <a className='btn-flat navbar-btn' href={CTX_PATH + '/user/login'}>登录/注册</a>
		}
		return <header>
					<div className='navbar-header'>
					    <a className='navbar-brand' href={CTX_PATH + '/home'}><img src={CTX_PATH + '/img/logo2.png'}/></a>
					    {consoleBtn}
					    {loginBtn}
					</div>
					<ul className='nav navbar-nav pull-right hidden-xs'>
						{navBars}
					</ul>
			</header>;
	}
});
/**
 * 副导航(菜单导航)
 */
var SidebarNav = React.createClass({
	render:function(){
		return <ul className='layui-nav'>
				  <li className='layui-nav-item'><a href='https://www.teraee.com/?page_id=36090' target='_blank'>最新资讯</a></li>
				  {/*
				  <li className='layui-nav-item'>
				    <a href='javascript:;'>云市场</a>
				    <dl className='layui-nav-child'>
				      <dd><a href=''>云计算服务</a></dd>
				      <dd><a href=''>云应用市场</a></dd>
				    </dl>
				  </li>
				  */}
				  <li className='layui-nav-item'>
				    <a href='javascript:;'>产品方案</a>
				    <dl className='layui-nav-child'>
				      <dd><a href='https://www.teraee.com/?page_id=35919' target='_blank'>云教室解决方案</a></dd>
				      <dd><a href='https://www.teraee.com/?page_id=35925' target='_blank'>云办公解决方案</a></dd>
				      <dd><a href='https://www.teraee.com/?page_id=35922' target='_blank'>云课程解决方案</a></dd>
				      <dd><a href=''>家庭云解决方案</a></dd>
				      <dd><a href={CTX_PATH+'/solution'}>申请产品试用</a></dd>
				    </dl>
				  </li>
				  <li className='layui-nav-item'><a href='https://www.teraee.com/?page_id=37047' target='_blank'>在线演示</a></li>
				  <li className='layui-nav-item'>
				    <a href='javascript:;'>合作发展</a>
				    <dl className='layui-nav-child'>
				      <dd><a href={CTX_PATH+'/agent-apply'}>申请代理商</a></dd>
				    </dl>
				  </li>
				  <li className='layui-nav-item'>
				    <a href='javascript:;'>App下载</a>
				    <dl className='layui-nav-child'>
				      <dd><a href='http://teracloud.cn/teracloud/download' target='_blank'>太易云电脑下载</a></dd>
				      <dd><a href='http://teracloud.cn/teracloud/download' target='_blank'>太易添算下载</a></dd>
				    </dl>
				  </li>
				  <li className='layui-nav-item'><a href={CTX_PATH+'/articles'} target='_blank' >太易文章</a></li>
				  <li className='layui-nav-item'><a href={CTX_PATH+'/shop/home'} target='_blank' >云点商城</a></li>
				  <li className='layui-nav-item'><a href='https://www.teraee.com/?page_id=35943' target='_blank' >关于我们</a></li>
			</ul>;
	}
});

var NavConsole = React.createClass({
	render:function(){
		return <li >
			        <a href={CTX_PATH+'/console'} >
				        控制台
				    </a>
			    </li>
	}
});
var NavLoginSign = React.createClass({
	render:function(){
		return <li >
			        <a href={CTX_PATH+'/user/login'} >
				        登录/注册
				    </a>
			    </li>
	}
});



var homeTopNav;
function initHomeTopNav(){
	homeTopNav = ReactDOM.render(
			<HomeTopNav></HomeTopNav>,
			document.getElementById('top-nav')
	);
	$.ajax({
		url:CTX_PATH+'/isLogin',
		type:'post',
		success:function(rtn){
			console.log('is login data:%o',rtn);
			if(!rtn.error){
				homeTopNav.setState({login:rtn.data});
			}else{
				layer.msg(rtn.msg);
			}
		}
	});
}
var sidebarNav;
function initSidebarNav(){
	sidebarNav = ReactDOM.render(
		<SidebarNav></SidebarNav>,
		document.getElementById('sidebar-nav-home')
	);
	layui.use('element', function(){
		  var element = layui.element; 
		});
}

initHomeTopNav();
initSidebarNav();