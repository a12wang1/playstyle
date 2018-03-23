var express = require('express');
var router = express.Router();

router.post('/banners', (req,res)=>{
//参数：imgUrl，targetUrl，type
    let json={data:[{imgUrl:'/images/upload/1508747876313zzz.png',targetUrl:'http://www.baidu.com',type:0}]};
    res.send(json)
})
module.exports = router;
