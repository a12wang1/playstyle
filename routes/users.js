var express = require('express');
var userModel=require("../model/UserModels")
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.all('/login', function(req, res) {
    res.render('login');
});
router.all('/lon', function(req, res) {
    console.log(req.query.email);
    if(req.query.email===undefined&&req.body.email===undefined){
        console.log("11")
    }else if(req.query.email!==undefined){
        let parm=[req.query.email,req.query.pwd];
        userModel["denlu"](req,res,parm);
    }else{
        let parm=[req.body.email,req.body.pwd];
        userModel["denlu"](req,res,parm);
    }
});
router.all('/zuce', function(req, res) {
    console.log("ininssasad");
    userModel["zhuche"](req,res);
});
router.all('/isLogin', function(req, res) {
    let loginBean = req.session.loginBean;
console.log(loginBean)
    console.log("进来查询登录状态了");
let json={};
if(loginBean===undefined){
json.data=false
}else{
    json.data=true

}
    res.send(json);

});
module.exports = router;
