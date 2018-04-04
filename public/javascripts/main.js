var PRE_PAGE_URL = document.referrer;
/**
 * 菜单图标css
 */
var menuIcons = {
	'首页':'icon-home',
	'控制台':'icon-dashboard',
	'共享管理':'iconfont  icon-operation',
	'系统管理':'icon-cog',
	'产品销售':'icon-briefcase',
	'运维中心':'icon-wrench',
	'代理商户中心':'icon-sitemap'
}
/**
 * 默认初始化页面方法,包括
 * initSideNav 
 */
function initPageDefault(){
	initTopNav();
	initSideNav();
}

/**
 * 初始化左侧导航栏
 * 仅加载到第二级菜单
 * @returns
 */
function initSideNav(){
	$.ajax({
		url:CTX_PATH+'/user/menu',
		type:'post',
		async:true,
		data:{token:$.cookie('token')},
		success:function(rtn){
			console.log('initSideNav data:%o',rtn);
			if(!rtn.error){
				var allMenus = rtn.data;
				var sideNavMenus = [];
				if(allMenus != null && allMenus.length > 0){
					allMenus = orderMenuArray(allMenus);
					
					//手机端增加 任务、消息和账号主菜单
					if(isMobileClient()){
						
						var userSubMenus = [];
						userSubMenus.push(<TeopsSideNavSubMenu name='账号设置' href={CTX_PATH+'/user/setting'}/>);
						userSubMenus.push(<TeopsSideNavSubMenu name='安全退出' href={CTX_PATH+'/logout'}/>);
						sideNavMenus.push(<TeopsSideNavMenu icon='icon-user' name='账号' menus={userSubMenus}/>);
						sideNavMenus.push(<TeopsSideNavMenu icon='icon-tasks' name='任务' href={CTX_PATH+'/user/task'}/>);
						sideNavMenus.push(<TeopsSideNavMenu icon='icon-envelope' name='消息' href={CTX_PATH+'/user/msg'}/>);
					}
							
					for(var i in allMenus){
						var menu = allMenus[i];
						var subMenuComps = [];
						var url = '#';
						var active = false;
						if(menu.url != null){
							url = CTX_PATH + menu.url;
						}
						if( activePage(url)){
							active = true;
						}
						var childs = menu.childs;
						if(childs != null && childs.length > 0){
							childs = orderMenuArray(childs)
							for(var j in childs){
								var subUrl = '#';
								if(childs[j].url != null){
									subUrl = CTX_PATH + childs[j].url;
								}
								if( activePage(subUrl)){
									active = true;
								}
								subMenuComps.push(<TeopsSideNavSubMenu name={childs[j].name} href={subUrl}/>);
							}
						}
						
						var menuComp = <TeopsSideNavMenu name={menu.name} href={url} icon={menuIcons[menu.name]}  menus={subMenuComps} active={active}/>;
						sideNavMenus.push(menuComp);
					}
					ReactDOM.render(
					  <TeopsSideNav menus={sideNavMenus}></TeopsSideNav>,
					  document.getElementById('sidebar-nav')
					);
				}else{
					layer.msg('菜单为空');
				}
			}else{
				layer.msg('初始化导航栏失败');
				console.error(rtn.msg)
			}
		}
	});
}
/**
 * 判断当前页是否与参数url匹配
 * 参数是不包含host和端口部分的url
 * 如果url符合当前页href（包含关系）
 */
function activePage(url){
	if(url == null || window.location.href == null ) {
		return false
	} else {
		var fullUrl = window.location.host+url;
		return window.location.href.indexOf(fullUrl) >= 0;
	}
}
/**
 * 根据order从小到大排序菜单
 * 使用冒泡排序
 * order为空排到最后
 */
function orderMenuArray(menus){
	for(var i = menus.length; i > 0 ;i--){
		for(var j = 0 ;j < i - 1;j++){
			var m1 = menus[j];
			var m2 = menus[j+1];
			if(m1.order == null || (m2.order != null && m1.order > m2.order)){
				menus[j] = m2;
				menus[j+1] = m1;
			}
		}
	}
	return menus;
}
/**
 * 控制台顶部导航栏
 */
var ConsoleTopNav = React.createClass({
	componentDidMount :function(){
		  $("#menu-toggler-my").click(function (e) {
		    e.stopPropagation();
		    $("body").toggleClass("menu");
		  });
		  $(this.refs.notification).find("[data-toggle='tooltip']").tooltip('toggle');
	},
	render:function(){
		var navBars = [];
		navBars.push(<NavTask></NavTask>);
		navBars.push(<NavMessage></NavMessage>);
		navBars.push(<NavCount></NavCount>);
		return <header>
					<div className='navbar-header'>
						<button className='navbar-toggle pull-right' type='button' data-toggle='collapse' id='menu-toggler-my'>
						    <span className='sr-only'>Toggle navigation</span>
						    <span className='icon-bar'></span>
						    <span className='icon-bar'></span>
						    <span className='icon-bar'></span>
					    </button>
					    <a className="navbar-brand" href={CTX_PATH + '/home'}><img src={CTX_PATH + '/img/logo2.png'}/></a>
					</div>
					<ul className='nav navbar-nav pull-right hidden-xs'>
						{navBars}
					</ul>
			</header>;
	}
});
/**
 * 
 */
var NavTask = React.createClass({
	getInitialState: function () {
	    return {
	    	tasks: [],
	    };
	},
	componentDidMount:function(){
		notificationEvent($(this.refs.notification));
		console.log('开始定时获取最新任务');
		var reactThis = this;
		var interval = 5000;//毫秒数 - 5秒
		var getTask = function(){
			$.ajax({
				url:CTX_PATH + '/user/task/page',
				type:'post',
				data:{
					token:$.cookie('token'),
					pageNum:1,
					pageSize:5,
				},
				success:function(rtn){
					if(!rtn.error){
						var data = rtn.data;
						var list = data.list;
						if(list != null && list.length > 0){
							reactThis.setState({tasks:list});
						}else{
							reactThis.setState({tasks:null});
						}
					}else{
						console.error(rtn.msg);
					}
				}
			});
		};
		getTask();
		setInterval(getTask,interval);
	},
	render:function(){
		var taskList = [];
		var state;
		if(this.state.tasks != null && this.state.tasks.length > 0){
			var tasks = this.state.tasks;
			for(var i in tasks){
				var t = tasks[i];
				var time;
				switch(t.status){
				case -3:
					time = t.excutedTime;
					state = <span className='badge warn'>未实现</span>;
					break;
				case -2:
					time = t.excutedTime;
					state = <span className='badge danger'>失败</span>;
					break;
				case -1:
					time = t.excutedTime;
					state = <span className='badge danger'>失败</span>;
					break;
				case 1:
					time = t.submitDate;
					state = <span className='badge'>等待</span>;
					break;
				case 2:
					time = t.excutedTime;
					state = <span className='badge success'>成功</span>;
					break;
				}
				var timeStr = timeToIntervalStr(time);
				taskList.push(<a href='#' className='item'>
								<div className='row'>
									<div className='col-md-6 no-padding'>
										【{t.executor}】
										<br/>
										{t.name}
									</div>
									<div className='col-md-2 no-padding'>
										{state}
									</div>
									<div className='col-md-4 no-padding'>
										<span className='time'><i className='icon-time'></i> {timeStr}</span>
									</div>
								</div>
				            </a>);
			}
		}
		
		return <li className='notification-dropdown hidden-xs hidden-sm' ref='notification'>
		        <a href='javascript:void(0);' className='trigger' data-toggle='tooltip' data-placement='bottom' title='最新任务'>
		            <i className='icon-tasks'></i>
		            <span className='count' ref='count'></span>
		        </a>
		        <div className='pop-dialog'>
		            <div className='pointer right'>
		                <div className='arrow'></div>  
		                <div className='arrow_border'></div>
		            </div>
		            <div className='body'>
		                <a href='#' className='close-icon'><i className='icon-remove-sign'></i></a>
		                <div className='notifications'>
		                	<h3>任务列表</h3>
		                    {taskList}
		                    <div className='footer'>
		                        <a href={CTX_PATH + '/user/task'}>查看所有任务</a>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </li>
		;
	}
})
/**
 * 顶部导航栏 - 消息组件
 */
var NavMessage = React.createClass({
	componentDidMount:function(){
		notificationEvent($(this.refs.notification));
	},
	render:function(){
		return <li className='notification-dropdown hidden-xs hidden-sm' ref='notification'>
			        <a href='#' className='trigger' data-toggle='tooltip' data-placement='bottom' title='最新消息'>
				        <i className='icon-envelope'></i>
				        <span className='count'></span>
			        </a>
			    <div className='pop-dialog'>
			        <div className='pointer right'>
			            <div className='arrow'></div>
			            <div className='arrow_border'></div>
			        </div>
			        <div className='body'>
			            <a href='#' className='close-icon'><i className='icon-remove-sign'></i></a>
			            <div className='messages'>
			                <a href='#' className='item last empty'>
			                    <div className='msg'>没有新消息</div>
			                </a>
			                <div className='footer'>
			                    <a href='#' className='logout'>查看历史消息</a>
			                </div>
			            </div>
			        </div>
			    </div>
			</li>;
	}
});
/**
 * 顶部导航栏 - 我的账号组件
 */
var NavCount = React.createClass({
	render:function(){
		var countUrl = CTX_PATH + '/user/setting';
		var logoutUrl = CTX_PATH + '/logout';
		return  <li className='dropdown'>
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
	}
})
/**
 * 初始化顶部导航栏
 * @returns
 */
var topNav;
function initTopNav(){
	
	console.log(1)
	topNav = ReactDOM.render(
			<ConsoleTopNav></ConsoleTopNav>,
			document.getElementById('top-nav')
	);
}



/**
 * 为Date添加格式化方法
 */
Date.prototype.format = function(format) {
    var date = {
           'M+': this.getMonth() + 1,
           'd+': this.getDate(),
           'h+': this.getHours(),
           'm+': this.getMinutes(),
           's+': this.getSeconds(),
           'q+': Math.floor((this.getMonth() + 3) / 3),
           'S+': this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp('(' + k + ')').test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
           }
    }
    return format;
}
/**
 * 日期转为字符串
 */
function dateToString(time){
	var date = new Date(time);
	 var year = date.getFullYear();
	 var month = (date.getMonth()+1)<10 ?('0'+(date.getMonth()+1)):date.getMonth()+1;
	 var day =  (date.getDate())<10 ?('0'+date.getDate()):date.getDate();
	 date = (year+'-'+month+'-'+day);
	 return date;
}
/**
 * 获取时间间隔字符串
 * @param t1 开始时间戳
 * @param t2 结束时间戳，为空则为当前时间戳
 */
function timeToIntervalStr(t1,t2){
	var dateTime;
	if(t2 == null){
		t2 = new Date().getTime();
	}
	var interval = t2 - t1;
	if(interval >= 0){
		// 任务时间间隔
		if (interval < 1000 * 60) {
			dateTime = parseInt(interval / 1000) + "秒前";
		} else if ((interval < (1000 * 60 * 60))
				&& (interval >= 1000 * 60)) {
			dateTime = parseInt(interval / (1000 * 60)) + "分钟前";
		} else if ((interval < (1000 * 60 * 60 * 24))
				&& (interval >= 1000 * 60 * 60)) {
			dateTime = parseInt(interval / (1000 * 60 * 60))
			+ "小时前";
		} else if (interval < 1000 * 60 * 60 * 24 * 365) {
			dateTime = new Date(t1).format('MM月dd日');
		}
	}else{
		dateTime = '刚刚';
	}
	return dateTime;
	
}
/**
 * 将时间戳格式化为"dd天hh小时mm分钟ss秒"
 */

function timestampFormt(t){
	var dateTime = '';
	if(t >= 0){
		var sec,min,hour,min,day;
		sec = parseInt((t%60000)/1000);
		min = parseInt((t%3600000)/60000);
		hour = parseInt((t%86400000)/3600000);
		day =  parseInt(t / (86400000));
		if(day > 0){
			dateTime = day + '天';
		}
		if(hour > 0){
			dateTime += hour + '小时';
		}
		if(min > 0){
			dateTime += min + '分钟';
		}
		if(sec > 0){
			dateTime += sec + '秒';
		}
	}
	return dateTime;
	
}

/** 修饰jquery ajax方法 **/
var _AJAX = $.ajax;
$.ajax = function(data){
	if(typeof data.success === 'function'){
		var _success = data.success;
		data.success = function(rtn){
			if(rtn.error){
				switch(rtn.error){
				case 'TEOPS-001000'://登录失效
				case 'TEOPS-001004'://未登录
					layer.confirm('登录失效请重新登录', 
						{
						  title:'提示',
						  btn: ['重新登录'],
						  id:'relogin',
						  closeBtn:false
						}, function(){
						  window.location.href = CTX_PATH + '/toLogin';
						},
					);
					return;
				case 'TEOPS-001005'://权限不足
					layer.msg('权限不足');
					return;
				}
			}
			_success(rtn);
		}
		_AJAX(data);
	}
}
var functionRepair = function(msg){
	layer.msg(msg == null?'功能维护中...':msg);
}
/**
 * 判断是否在移动端
 * 
 */
function isMobileClient(){
	return $(window).width() < 700;
}
function errorInfo(error){
	var info;
	switch(error){
	case 'TEOPS-002004'://新增权限 
		info = 'url 重复';
		break;
	default:
		info = '未知错误';
	}
	return info
}
function notificationEvent($el){
    var $dialog = $el.find(".pop-dialog");
    var $trigger = $el.find(".trigger");
    
    $dialog.click(function (e) {
        e.stopPropagation()
    });
    $dialog.find(".close-icon").click(function (e) {
      e.preventDefault();
      $dialog.removeClass("is-visible");
      $trigger.removeClass("active");
    });
    $("body").click(function () {
      $dialog.removeClass("is-visible");
      $trigger.removeClass("active");
    });

    $trigger.click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      // hide all other pop-dialogs
      $(".notification-dropdown .pop-dialog").removeClass("is-visible");
      $(".notification-dropdown .trigger").removeClass("active")

      $dialog.toggleClass("is-visible");
      if ($dialog.hasClass("is-visible")) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
}
/**
 * 邮箱验证器
 */
function emailValidator(email){
	var emailRgx = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return emailRgx.test(email);
}
/**
 * 手机号验证器
 */
function phoneValidator(phone){
	var phoneRex = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	return phoneRex.test(phone);
}
/**
 * type:
 * 1  整数
 * 2  非负整数
 */
function numberValidator(num,type){
	var rex;
	switch(type){
	case 1:
		rex = /^-?\d+$/;
		break;
	case 2:
		rex = /^\d+$/;
		break;
	default:
		rex = /^-?\d+$/;
	}
	return rex.test(num);
}

function zipCodValidator(ss){
	 var re= /^[1-9][0-9]{5}$/
	 if(re.test(ss)){
		 return true;
	 }else{
		 return false;
	 }
}