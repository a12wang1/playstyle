/**
 * 左侧导航栏组件
 * 设置id = dashboard-menu
 */

var TeopsSideNav = React.createClass({
  render: function() {
    return (
			<ul id='dashboard-menu'>
				{this.props.menus}
			</ul>
			);
  },
});
/**
 * 左侧导航栏 - 菜单组件
 * 
 */
var TeopsSideNavMenu = React.createClass({
    componentDidMount : function(){
    	var _react_this = this;
    	//TODO 包含子菜单时则增加click事件
    	if(this.props.menus != null && this.props.menus.length > 0){
    		var $btn = $(_react_this.refs.btn);
        	$btn.on('click',function(e){
        	    e.preventDefault();
        	    var $item = $(this).parent();
        	    $item.toggleClass("active");
        	    if ($item.hasClass("active")) {
        	      $item.find(".submenu").slideDown("fast");
        	    } else {
        	      $item.find(".submenu").slideUp("fast");
        	    }
        	});
    	}
    	
    },
  render : function(){	  
	var menus = this.props.menus;
	var active = '';
	var arrow = '';
	var chevronDown = '';
	var subMenus = '';
	var dropdownToggle = '';
    if(this.props.active == true){
		active = 'active';
		arrow =  <div className='pointer'>
                    <div className='arrow'></div>
                    <div className='arrow_border'></div>
                </div>;
    }
	
    //有子节点则不添加url
    var href = '#';
	if(menus != null && menus.length > 0){
		subMenus = <ul className={ active + ' submenu'}>
				    {menus}
			    </ul>;
		chevronDown = <i className='icon-chevron-down'></i>; 
		dropdownToggle = 'dropdown-toggle';
	} else{
		href = this.props.href;
	}	
    
    return (
		<li className={active}>        
		    <a className={dropdownToggle} href={href} ref='btn'>
		    	{arrow}
			    <i className={this.props.icon}></i>
			    <span>{this.props.name}</span>
			    {chevronDown}
		    </a>
		    {subMenus}
		</li>
		);
	}
});
/**
 * 左侧导航栏 - 子菜单组件
 */
var TeopsSideNavSubMenu = React.createClass({
	render : function(){
		return (
	        <li><a className={this.props.active == true?'active':''} href={this.props.href}>{this.props.name}</a></li>
		);
	}
});