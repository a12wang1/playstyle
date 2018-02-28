
// 中文字两个字节    
jQuery.validator.addMethod("IsFZJG", function(value, element) {    
  var length = value.length;    
  for(var i = 0; i < value.length; i++){    
   if(value.charCodeAt(i) > 127){    
    length++;    
   }    
  }    
  return this.optional(element) || ( length==3);    
}, "发证机关必须为3个字节(一个中文字算2个字节)");   
  
// 字符验证    
jQuery.validator.addMethod("userName", function(value, element) {    
  return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);    
}, "用户名只能包括中文字、英文字母、数字和下划线");    
  
// 手机号码验证    
jQuery.validator.addMethod("isMobile", function(value, element) {    
  var length = value.length;    
  return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));    
}, "请正确填写您的手机号码");    
  
// 电话号码验证    
jQuery.validator.addMethod("isPhone", function(value, element) {    
  var tel = /^(\d{3,4}-?)?\d{7,9}$/g;    
  return this.optional(element) || (tel.test(value));    
}, "请正确填写您的电话号码");    

//电子邮箱
jQuery.validator.addMethod("isEmail", function(value, element) {    
  var tel = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return this.optional(element) || (tel.test(value));    
}, "请正确填写您的电子邮箱");   

//联系方式验证    
jQuery.validator.addMethod("isTel", function(value, element) {   
  var length = value.length;   	
  var tel = /^(\d{3,4}-?)?\d{7,9}$/g;    
  return this.optional(element) || (tel.test(value)) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));    
}, "请正确填写您的联系方式"); 

// 邮政编码验证    
jQuery.validator.addMethod("isZipCode", function(value, element) {    
  var tel = /^[0-9]{6}$/;    
  return this.optional(element) || (tel.test(value));    
}, "请正确填写您的邮政编码");   

//保留  一到两位小数  
jQuery.validator.addMethod("isPublicNumber", function(value, element) {    
  var tel = /^\d{1,7}(\.\d{1,2})?$/; 
  return this.optional(element) || (tel.test(value));    
}, "请正确填写数值，最多保留2位小数！");  

//视力 保留  一位小数  
jQuery.validator.addMethod("eyeNumber", function(value, element) {    
  var tel = /^\d{1}(\.\d{1})?$/; 
  return this.optional(element) || (tel.test(value));    
}, "请正确填写视力数值，最多保留1位小数！"); 

//日期比较
$.validator.methods.compareDate = function(value, element, param){    
	var startDate = jQuery(param).val(); 
	var date1 = new Date(Date.parse(startDate.replace("-", "/"))); 
	var date2 = new Date(Date.parse(value.replace("-", "/"))); 
    return date1 < date2; 
};
//允许为空日期比较
$.validator.methods.compareDateN = function(value, element, param){
	
	var startDate = jQuery(param).val(); 
	var date1 = new Date(Date.parse(startDate.replace("-", "/"))); 
	var date2 = new Date(Date.parse(value.replace("-", "/")));
	if(value!="" ||undefined || null){
    return date1 < date2; 
	}else{
		return true;
	}
};

jQuery.validator.addMethod("idCardNumber",function(value, element){   
    var id1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;     //身份证正则表达式(15位)   
    var id2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|(\d{3}x))$/i;   //身份证正则表达式(18位)  
    var id3=/^([HM])([0-9]{10})$/;//港澳台证件号
    var id4=/^[A-Za-z0-9]{1,12}$/;//其它证件号
  
    if(value == '' || (id1.test(value) || id2.test(value)||id3.test(value)||id4.test(value))){   
        return true;
     }else{
        return false;   
     }
},"请输入合格的身份证号码");

