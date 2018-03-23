var TeOpsTab = React.createClass({
	componentDidMount : function(){
		var first = this.props.tabs[0];
		//触发第一个标签页
		if(first != null && first.loadData != null){
			first.loadData();
		}
	},
	render : function (){
		var tabNav = [];
		var tabContent = [];
		var tabData = this.props.tabs
		if(tabData != null && tabData.length > 0){
			for(var i in tabData){
				var t = tabData[i];
				var active = '';
				var contentActive = 'tab-pane ';
				var icon = '';
				if(t.icon != null){
					icon = <i className={t.icon}></i> 
				}
				if( t.active ){
					contentActive = contentActive + 'active';
					active = 'active';
				} 
				tabNav.push(<TeOpsTabHead active={ t.active } id={ t.id} icon={t.icon} name={t.name} loadData={t.loadData}></TeOpsTabHead>);
				tabContent.push(<div className={contentActive} id={t.id}></div>);
			}
		}
		return <div>
					<ul className='nav nav-tabs'>
						{tabNav}
				    </ul>
				    <div className='tab-content'>
				        {tabContent}
				    </div>
				</div>
			
		;
	}
});
/**
 * 标签页的头部组件
 * 
 * @props id 
 * @props active
 * @props icon
 * @props name
 * @props loadData
 * 
 * 设置jquery点击事件中触发执行loadData
 */
var TeOpsTabHead = React.createClass({
	componentDidMount : function(){
		var raect_this = this;
		$(this.refs.head).click(function (e) {
		    e.preventDefault();
		    $(this).tab('show');
		    //加载数据函数
		    if(raect_this.props.loadData != null){
		    	raect_this.props.loadData();
		    }
		})
	},
	render : function(){
		var icon = '';
		if(this.props.icon != null){
			icon = <i className={this.props.icon}></i> 
		}
		var active = '';
		if(this.props.active ){
			active = 'active';
		} 
		return <li className={active}><a href={'#' + this.props.id} ref='head'>{icon} {this.props.name}</a></li>;
	}
});