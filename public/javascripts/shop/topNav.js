let HomeTopNav = React.createClass({
	getInitialState: function () {
	    return {
	    	login:false,
	    	money:false
	    };
	},
	
	render:function(){
		var navBars = [];
		var consoleBtn;
		var loginBtn;
		if(this.state.login){
			if(this.state.money!==false){
				navBars.push(<ShowMoney money={this.state.money} />)
			}
			navBars.push(<NavConsole></NavConsole>);
			navBars.push(<NavCount></NavCount>);
			
			consoleBtn = <a className='btn-flat navbar-btn' href={ '/console'}>控制台</a>;
		}else{
			navBars.push(<NavLoginSign></NavLoginSign>);
			loginBtn = <a className='btn-flat navbar-btn' href={ '/user/login'}>登录/注册</a>
		}
		return <header>
					<div className='navbar-header'>
					    <a className='navbar-brand'  href={ '/home'}><img style={{height:'24px'}} src={ '/images/shop/ydsc.png'}/></a>
					    {consoleBtn}
					    {loginBtn}
					</div>
					<ul className='nav navbar-nav pull-right hidden-xs'>
						{navBars}
					</ul>
			</header>;
	}
});
let NavConsole = React.createClass({
	render:function(){
		return <li >
			        <a href={'/console'} >
				        控制台
				    </a>
			    </li>
	}
});
let  NavLoginSign = React.createClass({
	render:function(){
		return <li >
			        <a href={'/user/login'} >
				        登录/注册
				    </a>
			    </li>
	}
});
let NavCount = React.createClass({
	render:function(){
		var countUrl =  '/user/setting';
		var logoutUrl =  '/zhuxiao';
		return  <li className='dropdown' ref="toggle" onClick={this.beClick}>
	                <a href='javascript:void(0);' className='dropdown-toggle hidden-xs hidden-sm' data-toggle='dropdown'>
	                    	我的账号
	                    <b className='caret'></b>
	                </a>
	                <ul className='dropdown-menu'>
		                <li><a href={countUrl}>账号设置</a></li>
	                    <li role='presentation' className='divider'></li>
	                    <li><a href={logoutUrl}>安全退出</a></li>
	                </ul>
	            </li>;
	},
	beClick:function(){
		$(this.refs.toggle).toggleClass("open")
	}
})

let ShowMoney=React.createClass({
	render:function(){
		return <li >
        <span>云点: {this.props.money}</span>
    </li>
	}
})