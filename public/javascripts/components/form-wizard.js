/**
 * 
 */
var FormWizard = React.createClass({
	finish:function(){
		if(this.props.finish != null){
			this.props.finish();
		}else{
			console.warn('not defined finish method');
		}
	},
	componentDidMount : function(){
		var _props = this.props;
		var _this = this;
		var $wizard = $(this.refs.wizard);
		var $btnNext = $(this.refs.next);
		var $btnPrev = $(this.refs.prev);
		var $btnFinish = $(this.refs.finish);
		
		$wizard.wizard();
		
		if (_props.steps.length === 1) {
			$btnPrev.attr("disabled", "disabled");
			$btnNext.hide();
            $btnFinish.show();    
        }
		
		$wizard.on('finished',function(e){
			_this.finish();
			
		}).on('changed',function(e){
			var step = $wizard.wizard("selectedItem");
			 $btnNext.removeAttr("disabled");
             $btnPrev.removeAttr("disabled");
             $btnNext.show();
             $btnFinish.hide();
             if (step.step === 1) {
                 $btnPrev.attr("disabled", "disabled");
             }else if (step.step === _props.steps.length) {
                 $btnNext.hide();
                 $btnFinish.show();    
             }
		});
		console.log(this.props.steps.length);
		$btnNext.on('click',function(){
			 $wizard.wizard('next');
		});
		$btnPrev.on('click',function(){
			 $wizard.wizard('previous');
		});
		$btnFinish.on('click',function(){
			_this.finish();
		});
    },
	render:function(){
		
		var wizardSteps = [];
		var wizarContents = [];
		if(this.props.steps != null && this.props.steps.length > 0){
			
			var width = (100/this.props.steps.length)+'%';
			for(var i in this.props.steps){
				var step = parseInt(i) + 1;
				var id = 'step' + step
				var target = '#' + id;
				var active = '';
				if(step == 1){
					active = 'active';
				}
				wizardSteps.push(<li data-target={target} className={active} style={{minWidth: width,maxWidth: width}}>
						            <span className='step'>{step}</span>
						            <span className='title'>{this.props.steps[i].title}</span>
						        </li>);
				wizarContents.push(<div className={'step-pane '+active} id={id}>
									    <div className='row form-wrapper'>
								            <div className='col-md-8'>
								            	{this.props.steps[i].content}
								            </div>
								        </div>
								    </div>);
				
			}
		}
		
		
		return  <div className="col-md-12 col-xs-12">
					<div ref='wizard' className='wizard row'>
				        <ul className='wizard-steps'>
				        	{wizardSteps}
					    </ul>                            
				    </div>
					<div className='step-content'>
					    {wizarContents}
					</div>
					<div className='wizard-actions'>
					    <button ref='prev' type='button' className='btn-glow primary btn-prev'> 
					        <i className='icon-chevron-left'></i> 返回
					    </button>
					    <button ref='next' type='button' className='btn-glow primary btn-next'  data-last='Finish' style={{display: 'inline-block'}}>
					        下一步 <i className='icon-chevron-right'></i>
					    </button>
					    <button ref='finish' type='button' className='btn-glow success btn-finish' style={{display: 'none'}}> 完成 </button>
					</div>
			    </div>;
	}
});