let  forma1=(that)=>{
	return (<div className="strikeAndButton">
							<div className="SABspan">
								<div id="addAddress" className="footButton" style={{top:"-7",backgroundColor:'#6ec884' }}>新增地址</div>
							</div>
						</div>)
}

let forma2=(data,rel,that)=>{
	if(data[rel.field]){
		return "是";
	}
	return "否";
}

let forma3=(data,rel,that)=>{
	return (
			<div>
				<a className="operationA" onClick={()=>{openDialog(data);
					}}>修改</a>丨<a className="operationA" onClick={()=>{
						$.ajax({
									url:CTX_PATH+"/shop/api/address/remove",
									type:'post',
									data:{
										addressUuid:data.uuid
									},
									success:function(rtn){
										if(!rtn.error){ 
											layer.msg("删除地址成功！");
									        LoadingAddress();
										}else{
											layer.msg(rtn.msg);
										} 
									}
								});
					}}>删除</a>
			</div>
	)
}


let detailTopNavs,data1=[{mainUrl:"../home",name:"平台首页",data:[{url:"https://www.teraee.com/?page_id=36090",name:"最新资讯"},
                                                   {url:CTX_PATH+'/solution',name:"申请产品试用"},
                                                   {url:"https://www.teraee.com/?page_id=37047",name:"在线演示"}]},
                         {mainUrl:"./home",name:"商品首页"},
                         {mainUrl:"./order/detail",name:"我的订单"}],A,
                  data2=[{name:"收货人",width:"100",field:"contact"},
                         {name:"所在地区",width:"200",field:"area"},
                         {name:"详细地址",width:"300",field:"address"},
                         {name:"邮编",width:"65",field:"zipCode"},
                         {name:"电话",width:"135",field:"phone"},
                         {name:"是否默认",width:"50",field:"first",formatter:forma2},
                         {name:"操作",width:"105",field:"do",formatter:forma3}],
WatchButtom={bottom:true,pagination:true,pageSize:"10",custom:forma1,parameter:["strike"]};

let AddressTable=React.createClass({
	render:function(){
		return (
				<div>
					{/*<h2 className="caption">已保存了0条地址，还能保存20条地址</h2>*/}
					<MyTable {...this.props} ref={(MyTable)=>{this.MyTable=MyTable;}} />	
				</div>
		)
	},
	able:function(){
		this.MyTable.changestate()
	}
});
let loginYN;
(function(){
	detailTopNavs = ReactDOM.render(
			<HomeTopNav></HomeTopNav>,
			document.getElementById('TopNav')
	);
	$.ajax({
		url:CTX_PATH+'/isLogin',
		type:'post',
		success:function(rtn){
			console.log('is login data:%o',rtn);
			if(!rtn.error){ 
				detailTopNavs.setState({login:rtn.data});
				loginYN=rtn.data;
				if(!rtn.data){
					   layer.close(layerIndex);
					layer.msg("您暂未登录,无法查看地址管理，3S后将跳转到登录界面！");
					setTimeout(function(){
						window.open(CTX_PATH + '/toLogin',"_self");
					},3000)
				}
			}else{
				layer.msg(rtn.msg);
			} 
		}
	});
	
})();
(function(){
 	ReactDOM.render(			
		<SidebarNav data={data1}></SidebarNav>,
		document.getElementById("addressSidebarNav")
		)
})();
function LoadingAddress(){
	$.ajax({
		url:CTX_PATH+"/shop/api/address/list",
		type:'post',
		success:function(rel){
			if(!rel.error){
				if(rel.data===null&&loginYN){
					A=ReactDOM.render(			
							<AddressTable WatchHead={data2} data={[]} WatchButtom={WatchButtom} />,
							document.getElementById("addressTable")
							)
							layerIndex=layer.open({
								  type: 1,
								  title:"添加地址",
								  content: $("#addressAbout"),
								  resize:false,
								  scrollbar:false,
								  area:['900px','500px']
								});
				}else if(rel.data!==null){
					A=ReactDOM.render(			
							<AddressTable WatchHead={data2} data={rel.data} WatchButtom={WatchButtom} />,
							document.getElementById("addressTable")
							)
				}
				
			}else{
				layer.msg(rel.msg);
			}
		}
	});
 	

 	
};
LoadingAddress();
let layerIndex;
$(document).on("click","#addAddress",function(){
	$("#getProvinces").val("");
	$("#detailedAdr").val("");
	$("#zipCodA").val("");
	$("#Consignee").val("");
	$("#ConsigneePhone").val("");
	$("#defaultz").prop("checked",false);
	$("#uuidHidden").val("");
	$("#typeOfSubmit").val("2");
    $("#selLev0,#selLev1,#selLev2 ").css("display","none").html("");
	layerIndex=layer.open({
		  type: 1,
		  title:"添加地址",
		  content: $("#addressAbout"),
		  resize:false,
		  scrollbar:false,
		  area:['900px','500px']
		});
});

$("#submitAdr").on("click",function(){
	let key=0;
	let detailedAdr=$("#detailedAdr");
	let Consignee=$("#Consignee");
	let ConsigneePhone=$("#ConsigneePhone");
	let defaultz=$("#defaultz");
	let getProvinces=$("#getProvinces");
	if(detailedAdr.val().length<5||detailedAdr.val().length>120){
		key=1;
		detailedAdr.css("border-color","red").next("div").children(".rowTip").css("display","inline-block");
	}else{
		detailedAdr.css("border-color","#afafaf").next("div").children(".rowTip").css("display","none");
	}

	
	if(Consignee.val().length<2||Consignee.val().length>25){
		key=1;
		Consignee.css("border-color","red").next("div").children(".rowTip").css("display","inline-block");
	}else{
		Consignee.css("border-color","#afafaf").next("div").children(".rowTip").css("display","none");
	}
	
	if(!phoneValidator(ConsigneePhone.val())){
		key=1;
		ConsigneePhone.css("border-color","red").next("div").children(".rowTip").css("display","inline-block");
	}else{
		ConsigneePhone.css("border-color","#afafaf").next("div").children(".rowTip").css("display","none");
	}
		
	if(getProvinces.val().length<2||$("#selLev2").css("display")=="inline-block"){
		key=1;
		getProvinces.css("border-color","red").nextAll("div").children(".rowTip").css("display","inline-block");
	}else{
		getProvinces.css("border-color","#afafaf").nextAll("div").children(".rowTip").css("display","none");
	}
	if(key===0){
		if($("#typeOfSubmit").val()==="1"){
		
		$.ajax({
			url:CTX_PATH+"/shop/api/address/update",
			type:'post',
			data:{
				addressUuid:$("#uuidHidden").val(),
				contact:Consignee.val(),
				areaCode:$("#zipCodA").val(),
				address:detailedAdr.val(),
				phone:ConsigneePhone.val(),
				zipCode:$("#zipCodA").val(),
				first:defaultz.is(':checked')
			},
			success:function(rel){
				if(!rel.error){
			        layer.close(layerIndex);
			        LoadingAddress();
					layer.msg("修改地址成功！");
				}else{
					layer.msg(rel.msg);
				}
			}
		});
		}else if($("#typeOfSubmit").val()==="2"||$("#typeOfSubmit").val()===""){
			$.ajax({
				url:CTX_PATH+"/shop/api/address/add",
				type:'post',
				data:{
					contact:Consignee.val(),
					areaCode:$("#zipCodA").val(),
					address:detailedAdr.val(),
					phone:ConsigneePhone.val(),
					zipCode:$("#zipCodA").val(),
					first:defaultz.is(':checked')
				},
				success:function(rel){
					if(!rel.error){
						console.log(layerIndex);
				        layer.close(layerIndex);
				        LoadingAddress();
						layer.msg("新增地址成功！");
					}else{
						layer.msg(rel.msg);
					}
				}
			});
		}
	}
});

function clearAdrData(){
	initSelection();
	$("#detailedAdr").val("");
	$("#zipCodA").val("");
	$("#Consignee").val("");
	$("#ConsigneePhone").val("");
	$("#defaultz").attr("checked",false);
}
function setAdrData(a,b,c,d,e,f){
	$("#detailedAdr").val(b);
	$("#zipCodA").val(c);
	$("#Consignee").val(d);
	$("#ConsigneePhone").val(e);
	$("#defaultz").attr("checked",f);
}
$("#selLev0").on("change",function(){
	let index=document.getElementById('selLev0').selectedIndex;
    $("#getProvinces").val(document.getElementById('selLev0').options[index].text);
	$.ajax({
		url:CTX_PATH+"/shop/api/areas",
		type:'post',
		data:{
			areaCode:$(this).val()
		},
		success:function(rel){
			if(!rel.error){
				$("#selLev1").css("display","inline-block");
				$("#selLev2").css("display","none");
				let $sel1=$("#selLev1");
				let s="";
				for(let i=0;i<rel.data.length;i++){
					s+="<option value="+rel.data[i].code+">"+rel.data[i].name+"</option>"
				}
				$sel1.html(s);
			}
		}
	});	
})
$("#selLev1").on("change",function(){
	let index=document.getElementById('selLev1').selectedIndex;
    $("#getProvinces").val( $("#getProvinces").val()+document.getElementById('selLev1').options[index].text);
	$.ajax({
		url:CTX_PATH+"/shop/api/areas",
		type:'post',
		data:{
			areaCode:$(this).val()
		},
		success:function(rel){
			if(!rel.error){
				let $sel2=$("#selLev2");
				if(rel.data.length>0){	
				$sel2.css("display","inline-block");
				let s="";
				for(let i=0;i<rel.data.length;i++){
					s+="<option value="+rel.data[i].code+">"+rel.data[i].name+"</option>"
				}
				$sel2.html(s);
				}else{
					$("#zipCodA").val($(this).val());
					 $("#selLev0,#selLev1,#selLev2 ").css("display","none");
					 $sel2.html("");
				}	
			}
		}
	});	
})
$("#selLev2").on("change",function(){
	let index=document.getElementById('selLev2').selectedIndex;
    $("#getProvinces").val( $("#getProvinces").val()+document.getElementById('selLev2').options[index].text);
    $("#selLev0,#selLev1,#selLev2 ").css("display","none");
    $("#zipCodA").val($(this).val());
})
$("#getProvinces").on("click",function(){
	let $sel0=$("#selLev0");
	if($sel0.html()!==""){
		$sel0.css("display","inline-block");
		if($("#selLev1").html()!==""){
			$("#selLev1").css("display","inline-block");
		}
		if($("#selLev2").html()!==""){
			$("#selLev2").css("display","inline-block");
		}
		return;
	}
	$.ajax({
		url:CTX_PATH+"/shop/api/areas",
		type:'post',
		data:{		
		},
		success:function(rel){
			if(!rel.error){
				$sel0.css("display","inline-block");
				let s="";
				for(let i=0;i<rel.data.length;i++){
					s+="<option value="+rel.data[i].code+">"+rel.data[i].name+"</option>"
				}
				$sel0.html(s);
			}		
		}
	});	
})

function openDialog(data){
	$("#getProvinces").val(data.area);
	$("#detailedAdr").val(data.address);
	$("#zipCodA").val(data.zipCode);
	$("#Consignee").val(data.contact);
	$("#ConsigneePhone").val(data.phone);
	$("#defaultz").prop("checked",data.first);;
	$("#uuidHidden").val(data.uuid);
	$("#typeOfSubmit").val("1");
    $("#selLev0,#selLev1,#selLev2").css("display","none").html("");
	layerIndex=layer.open({
		  type: 1,
		  title:"修改地址",
		  content: $("#addressAbout"),
		  resize:false,
		  scrollbar:false,
		  area:['900px','500px']
		});
}

