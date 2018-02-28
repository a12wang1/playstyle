module.exports={
    CheckSession:function (req,res) {
        let loginBean = req.session.loginBean;
        if(loginBean==undefined){
            res.send("<script>alert('登录已过时，请重新登录!');window.location.href='/';</script>");
            return false;
        }
        return loginBean;
    }
}