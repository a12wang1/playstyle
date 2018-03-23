/**
 * 
 */
var TeOpsTable = React.createClass({
    getInitialState: function () {  
        return {
        	keyWords:{},
        	pageNum:1,
        	pageSize:10,
        	total:0,
        	rows:null,
        };  
    },
    refreshPage:function(){
    	this.props.loadData(this.state.keyWords,this.state.pageNum,this.state.pageSize);
    },
    firstPage:function(){
    	this.skipPageNum(1);
    },
    skipPageNum:function(current){
    	if(this.props.loadData != null){
    		this.props.loadData(this.state.keyWords,current,this.state.pageSize);
    	}
    },
    previousPage:function(){
    	if(this.props.loadData != null){
    		var current = this.state.pageNum;
    		if(current > 1 ){
    			this.props.loadData(this.state.keyWords,--current,this.state.pageSize);
    		}
    	}
    },
    nextPage:function(){
    	if(this.props.loadData != null){
    		var current = this.state.pageNum;
    		var total = this.state.total;
    		var pageSize = this.state.pageSize;
    		var pageTotal = parseInt(total/pageSize) + (total%pageSize > 0 ? 1:0);
    		if(current < pageTotal){
    			this.props.loadData(this.state.keyWords,++current,pageSize);
    		}
    	}
    },
    lastPage:function(){
    	var current = this.state.pageNum;
		var total = this.state.total;
		var pageSize = this.state.pageSize;
    	var pageTotal = parseInt(total/pageSize) + (total%pageSize > 0 ? 1:0);
    	if(current < pageTotal){
			this.props.loadData(this.state.keyWords,pageTotal,pageSize);
		}
    },
	render : function(){
		var title = this.props.title;
		var head;
		if(title != null && title != ''){
			head = <div className='pull-left table-head'>
                        <h4>{title}</h4>
					</div>;
		}
		var bar;
		var barCompnents = this.props.barCompnents
		if(barCompnents != null && barCompnents.length > 0){
			bar = <div className='pull-right'>
		            {barCompnents}
			      </div>;
		}
		var tHead;
		var heads = this.props.heads;
		var ratios = this.props.ratios;
		if(heads != null ){
			tHead = [];
			var i = 0;
			for(var key in heads){
				var line = '';
				if(i != 0){
					line = <span className='line'></span>;
				}
				var rClass;
				if(ratios != null){
					var r = ratios[key];
					if(r != null){
						rClass = 'col-md-'+r+' col-xs-'+r;
					}
				}
				tHead.push(<th className={rClass}> {line} {heads[key]}</th>);
				i++;
			}
		}
		var pagingBar;
		if(this.props.paging){
			pagingBar = <TeOpsTabelPagingBar firstPage={this.firstPage} lastPage={this.lastPage} skipPageNum={this.skipPageNum} previousPage={this.previousPage} nextPage={this.nextPage} pageNum={this.state.pageNum} pageSize={this.state.pageSize} total={this.state.total} ></TeOpsTabelPagingBar>;
		}
		var rows = null;
		var empty;
		
		if(this.state.rows != null){
			rows = this.state.rows;
		}else{
			rows = this.props.rows;
		}
		return (
			<div className='table-wrapper'>
				<div className='row filter-block'>
				{head}
				{bar}
				</div>
				<div className='row'>
	                <table className='table table-hover'>
	                    <thead>
	                        <tr>
	                        	{tHead}
	                        </tr>
	                    </thead>
	                    <tbody className={empty}>
	                    	{rows}
	                    </tbody>
	                </table>
	            </div>
	            <div className='row'>  {pagingBar} </div>
			</div>
		);
	}
});

var TeOpsTableTopBar = React.createClass({
	render : function(){


		return ;
	}
});


/**
 * type属性设置按钮颜色
 * 1. 缺省
 * 2. inverse
 * 3. primary
 * 4. success
 */
var TeOpsTableBtn = React.createClass({
	componentDidMount : function(){
    	var _react_this = this;
    	var $btn = $(_react_this.refs.btn);
    	$btn.on('click',function(e){
    		_react_this.props.click();
    	});
    },
    componentWillUnmount :function(){
    	$(this.refs.btn).off('click');
    },
	render : function(){
		var icon;
		if(this.props.icon != null ){
			icon = <i className={this.props.icon}></i>
		}
		var className = 'btn-glow';
		if(this.props.type != null){
			className += (' '+this.props.type );
		}
		return <a ref='btn' className={className}>
				{icon}
				{this.props.name}
				</a>;
	}
});

var TeOpsTabelPagingBar = React.createClass({
	pageBtnClick : function(current){
		if(current != null){
			this.props.skipPageNum(current);
		}
	},
	render : function(){
		var pageNum = this.props.pageNum;
		var pageSize = this.props.pageSize;
		var total = this.props.total;
		var pageTotal = parseInt(total/pageSize) + ( total%pageSize > 0 ? 1:0);
		var pageBtns = [];
		var skipInput = <div className='input-group'>
					      <input type='text' className='form-control'/>
					      <span className='input-group-btn'>
					        <button className='btn btn-default' type='button'>Skip</button>
					      </span>
					    </div>;
		if(pageTotal > 0){
//			for(var i = 0; i < pageTotal ;i++){
//				var active = '';
//				var current = i + 1;
//				if( current == pageNum){
//					active= 'active';
//				}
//				pageBtns.push(<li className={active}><a href='#' onClick={this.pageBtnClick.bind(this,current==pageNum?null:current)} >{current}</a></li>);
//			}
			
			//
			var maxPageBtn = 5;//最多显示5个分页按钮
			var begin,end;//开始页码和结束页码
			if(pageTotal > maxPageBtn ){
				if(pageNum > 2 && pageNum < pageTotal - 2){
					begin = pageNum - 2;
					end = begin + maxPageBtn - 1;
				}else if(pageNum <= 2){
					begin = 1;
					end = maxPageBtn;
				}else{
					begin = pageTotal - maxPageBtn + 1;
					end = pageTotal;
				}
			}else{
				begin = 1;
				end = pageTotal;
			}
			
			for(var i = begin;i <= end;i++){
				var active = '';
				if( i == pageNum){
					active= 'active';
				}
				pageBtns.push(<li className={active}><a href='#' onClick={this.pageBtnClick.bind(this,i==pageNum?null:i)} >{i}</a></li>);
			}
		}
		return  <div className='row'>  
					<ul className='pagination-info pull-left'>
						<li>一共</li>
						<li>{total}</li>
						<li>记录</li>
					</ul> 
					<ul className='pagination pull-right'>
						<li><a href='#' onClick={this.props.firstPage}>首页</a></li>
						<li><a href='#' onClick={this.props.previousPage}>«</a></li>
						{pageBtns}
						<li><a href='#'  onClick={this.props.nextPage}>»</a></li>
						<li><a href='#' onClick={this.props.lastPage}>尾页</a></li>
					</ul> 
				</div>;
	}
});
/**
 * enterCall属性设置搜索框Enter事件触发的回调方法
 */
var TeOpsTableSearch = React.createClass({
    componentDidMount : function(){
    	var _react_this = this;
    	var $input = $(_react_this.refs.serachInput);
    	var call = this.props.enterCall
    	if(call != null){
    		$input.on('keypress',function(e){
        		var val = $(this).val();
        		if(e.keyCode == 13){
        			call(val);
        		}
        	});
    	}
    },
    componentWillUnmount :function(){
    	$(this.refs.serachInput).off('keypress');
    },
	render : function(){
		return <input type='text' ref='serachInput' className='search' placeholder={this.props.placeholder}></input>;
	}
});	
/**
 * 表格过滤器组件
 */
var TeOpsTableFilter = React.createClass({
	componentDidMount:function(){
//		var $select = $(this.refs.select);
//		$select.change(function(){
//			if(typeof this.props.change ==== 'funciton'){
//				this.props.change($select.val());
//			}
//		});
	},
	render:function(){
		var options = [];
		var filters = this.props.filters;
		if(filters != null){
			for(var i in filters){
				options.push(<option value={filters[i]}>{i}</option>);
			}
		}
		return <div className='ui-select table-filter'>
			        <select ref='select'>
				        {options}
				      </select>
			  </div>
	}
});
	
	