var conn = require("./ConnPool")
var async = require("async");
module.exports = {
    goodsAbout:(req,res)=>{
        var son = conn();
        let parms= req.body;
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink,parm;
            if(parms.categoryUuid===undefined && parms.name===undefined&&parms.priceMin===undefined){
                console.log("是这里吗")
                // sqlLink=  "select id,name,price,saleNum,storeNum,description,imgUrls from goods where email=? and pwd=?";
                // sqlLink="select top ? * from (select * from goods where id<?) m order by m.id desc"
                // select top n-m+1 * from test where (id not in(select top m-1 id from test))
                sqlLink="select  * from goods order by id desc limit ?,?"
                 parm=[parseInt(parms.pageNum)-1,parseInt(parms.pageNum)+parseInt(parms.pageSize)-1]
                console.log(parm)
            }
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    res.send("数据读取失败");
                    console.log(err,"err")
                } else {
                    // res.send("<script>alert('注册成功！');history.back();</script>");
                    console.log(rel,"rel")
                    for(let s=0;s<rel.length;s++){
                         k=rel[s].imgUrls.split(',');
                        rel[s].imgUrls=k
                    }
                    res.send(rel);
                }
                conns.release();

            })
        })
    }
}