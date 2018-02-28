var conn = require("./ConnPool")
var logins = require("../jsbean/loginBean");
var session = require('express-session');

module.exports = {
    zhuche: function (req, res) {
        console.log("zhucheININ");
        var son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink = "insert into user (email,pwd,nicheng,createtime) values(?,?,?,current_timestamp)";
            let parm = [req.body["email"], req.body["pwd"], req.body["nicheng"]];
            conns.query(sqlLink, parm, function (err, con) {
                if (err) {
                    let s = err.message;
                    console.log(err.message);
                    if (s.indexOf("emailuniq") >= 0) {
                        res.send("<script>alert('存库失败，邮箱重复');history.back();</script>");
                    } else if (s.indexOf("nichenguiq") >= 0) {
                        res.send("<script>alert('存库失败，昵称重复');history.back();</script>");
                    } else {
                        res.send("<script>alert('存库失败，未知错误');history.back();</script>");
                    }
                } else {
                    // res.send("<script>alert('注册成功！');history.back();</script>");
                    res.redirect(307,'./lon');
                }
                conns.release();

            })
        })


    },
    denlu: function (req, res, parm) {
        var son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlSentence = "select uid,nicheng from user where email=? and pwd=?";
            console.log(parm);
            conns.query(sqlSentence, parm, function (err, rel) {
                if (err) {
                    res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                    return;
                }
                console.log("rel==" + rel);
                if (rel.length > 0) {
                    var loginBean = new logins(rel[0].nicheng, rel[0].uid);
  /*                  loginBean(rel[0].nicheng, rel[0].uid);
                    */
                    console.log("loginBen=");
                    console.log(loginBean);
                    req.session.loginBean=loginBean;
                    // res.send("<script>alert('登录成功！');</script>");
                    targeturl = req.body['targeturl'];
                    res.redirect(targeturl);
                } else {
                    res.send("<script>alert('账号或密码错误，请重试！');history.back();</script>");
                    console.log("no data");
                }
                conns.release();
            })
        })
    }
}