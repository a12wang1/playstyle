var express = require('express');
var router = express.Router();
var session = require('express-session');
var fs = require("fs");
var multiparty = require("multiparty");
var util = require('util');
var questionModel = require('../model/questionModel')
var path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
    let i = 0;
    if (i === 0) {
        // res.sendFile("/nodeProject/botton.html")
        let Bpath=path.join(__dirname, '../')
        Bpath= path.join(Bpath, 'views/shop')
        res.render(Bpath+"/shop_home");
    } else {
        let loginBean = req.session.loginBean;
        questionModel.getAllQuestion(req,res,loginBean);

    }
});

router.get('/goods/detail', function (req, res, next) {
    let Bpath=path.join(__dirname, '../')
    Bpath= path.join(Bpath, 'views/shop')
    res.render(Bpath+"/shop_goods_detail");
});
router.get('/shop/orders', function (req, res, next) {
    let Bpath=path.join(__dirname, '../')
    Bpath= path.join(Bpath, 'views/shop')
    res.render(Bpath+"/shop_orders");
});
router.get('/shop/address', function (req, res, next) {
    let Bpath=path.join(__dirname, '../')
    Bpath= path.join(Bpath, 'views/shop')
    res.render(Bpath+"/shop_address");
});
router.get('/order/detail', function (req, res, next) {
    let Bpath=path.join(__dirname, '../')
    Bpath= path.join(Bpath, 'views/shop')
    res.render(Bpath+"/shop_orders_detail");
});
router.get('/home', function (req, res) {
    res.redirect(307,'/');
});







router.all('/zhuxiao', function (req, res) {
    console.log("我点击了注销；");
    req.session.destroy(function (err) {
        res.redirect("/");
    })
});
router.post('/uploadImg', function (req, res) {
    let Bpath=path.join(__dirname, '../')

    console.log("进来了这个方法吗？图像方法");
    var form = new multiparty.Form();
    //设置编码
    form.encoding = 'utf-8';
    //设置文件存储路径all
    form.uploadDir = Bpath+"/uploadtemp/";
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所有文件的大小总和

    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send('{"err":' + err + ',"msg":"no file"}')
            return;
        }
        uploadurl = '/images/upload/';
        console.log(files);
        file1 = files['filedata'];
        console.log(file1);
        paraname = file1[0].fieldName;  //参数名filedata
        originalFilename = file1[0].originalFilename; //原始文件名
        tmpPath = file1[0].path;//uploadtemp\\fac4YAKi7FG46hs_K270cWww.jpg
        fileSize = file1[0].size; //文件大小

        var timestamp = new Date().getTime(); //获取当前时间戳
        uploadurl += timestamp + originalFilename
        newPath =  Bpath+'/public' + uploadurl;

        var fileReadStream = fs.createReadStream(tmpPath);
        var fileWriteStream = fs.createWriteStream(newPath);
        fileReadStream.pipe(fileWriteStream); //管道流
        fileWriteStream.on('close', function () {
            fs.unlinkSync(tmpPath);    //删除临时文件夹中的图片
            console.log('copy over');
            res.send('{"err":"","msg":"' + uploadurl + '"}')
        });
    });
    //-----------------------------------------
    //res.send('上传');
});
router.post("/base64UP", function (req, res) {
    let Bpath=path.join(__dirname, '../')
    //接收前台POST过来的base64
    var imgData = req.body.imgData;
    var name = new Date().getTime() + req.body.name;
    var format = req.body.format;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    console.log(base64Data.length);
    var dataBuffer = new Buffer(base64Data, 'base64');
    console.log(__dirname,process.cwd(),process.execPath)
    fs.writeFile(Bpath+"/public/images/upload/" + name + "."+format, dataBuffer, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send("保存成功！");
        }
    });
})
module.exports = router;
