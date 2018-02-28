var express = require('express');
var router = express.Router();
var session = require('express-session');
var CheckSession = require('../jsbean/CheckSession')
var questionModel = require('../model/questionModel')
router.all("/ask", function (req, res) {
    console.log("我进了问题了！");
    /* let loginBean = req.session.loginBean;
     if(loginBean==undefined){
         res.send("<script>alert('登录已过时，请重新登录!');window.location.href='/';</script>");
         return;
     }*/
    let loginBean = CheckSession.CheckSession(req, res);
    if (!loginBean) {
        return;
    }
    res.render("ask", {title: loginBean.nicheng + "的", loginBeans: loginBean});
});
router.all('/askTi', function (req, res) {
    let loginBean = CheckSession.CheckSession(req, res);
    if (!loginBean) {
        return;
    }
    if (req.query.subflag === undefined && req.body.subflag === undefined) {
        console.log("11")
    } else if (req.query.subflag === undefined) {
       let type= req.body.type.split('-');
        req.params = [req.body.title, type[0], req.body.content, loginBean.uid,type[1],loginBean.nicheng];
        console.log(type);
        questionModel.askTijiao(req, res);
    } else {
        let type= req.query.type.split('-');
        req.params = [req.query.title, type[0], req.query.content, loginBean.uid,type[1],loginBean.nicheng];
        console.log(type);
        questionModel.askTijiao(req, res);
    }
    /*    console.log("我点击了提问；");
        res.send("<script>alert('点击提问')</script>");*/
});
router.all("/count", function (req, res) {
    console.log("我进了详情了！");
    questionModel.getCount(req,res)
    });
router.all('/reply', function (req, res) {
    let loginBean = CheckSession.CheckSession(req, res);
    if (!loginBean) {
        return;
    }
    console.log("ininreply")
    if (req.query.content === undefined && req.body.content === undefined) {
        console.log("11")
    } else if (req.query.content === undefined) {
        console.log("smgui")

        questionModel.reply(req, res,loginBean);
    } else {
        questionModel.reply(req, res,loginBean);
    }

});
module.exports = router;