var conn = require("./ConnPool")
var async = require("async");
module.exports = {
    goodsAbout: (req, res) => {
        let son = conn();
        let parms = req.body;
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;
            if (parms.categoryUuid === undefined && parms.name === undefined && parms.priceMin === undefined) {
                // sqlLink=  "select id,name,price,saleNum,storeNum,description,imgUrls from goods where email=? and pwd=?";
                // sqlLink="select top ? * from (select * from goods where id<?) m order by m.id desc"
                // select top n-m+1 * from test where (id not in(select top m-1 id from test))
                sqlLink = "select  * from goods order by saleNum desc limit ?,?"
                parm = [(parseInt(parms.pageNum) - 1) * parseInt(parms.pageSize), parseInt(parms.pageNum) * parseInt(parms.pageSize) - 1]
            } else if (parms.name === undefined && parms.priceMin === undefined) {
                sqlLink = "select  * from goods where categoryUuid=? order by saleNum desc limit ?,? "
                parm = [parms.categoryUuid, (parseInt(parms.pageNum) - 1) * parseInt(parms.pageSize), parseInt(parms.pageNum) * parseInt(parms.pageSize) - 1]
            } else if (parms.priceMin === undefined) {
                sqlLink = "select  * from goods where name LIKE  '%" + parms.name + "%' order by saleNum desc limit ?,? "
                parm = [(parseInt(parms.pageNum) - 1) * parseInt(parms.pageSize), parseInt(parms.pageNum) * parseInt(parms.pageSize) - 1]
            } else {
                sqlLink = "select  * from goods where price > ? AND price < ? order by saleNum desc limit ?,? "
                parm = [parms.priceMin, parms.priceMax, (parseInt(parms.pageNum) - 1) * parseInt(parms.pageSize), parseInt(parms.pageNum) * parseInt(parms.pageSize) - 1]
            }
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(s)
                    res.send("数据读取失败");
                } else {
                    for (let s = 0; s < rel.length; s++) {
                        k = rel[s].imgUrls.split(',');
                        rel[s].imgUrls = k
                    }
                    res.send(rel);
                }
                conns.release();
            })
        })
    },
    buyCarList: (req, res) => {
        let son = conn();
        let parms = req.body;
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;
            if (parms.categoryUuid === undefined && parms.name === undefined && parms.priceMin === undefined) {
                // sqlLink=  "select id,name,price,saleNum,storeNum,description,imgUrls from goods where email=? and pwd=?";
                // sqlLink="select top ? * from (select * from goods where id<?) m order by m.id desc"
                // select top n-m+1 * from test where (id not in(select top m-1 id from test))
                sqlLink = "select  * from buy_goods order by id desc limit ?,?"
                parm = [(parseInt(parms.pageNum) - 1) * parseInt(parms.pageSize), parseInt(parms.pageNum) * parseInt(parms.pageSize) - 1]
            }
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                } else {
                    console.log(rel)
                    for (let s = 0; s < rel.length; s++) {
                        k = rel[s].imgUrl.split(',');
                        rel[s].imgUrl = [k[0]]
                    }
                    res.send(rel);
                }
                conns.release();
            })
        })


    },
    addCar: (req, res) => {

        let son = conn();
        let parms = req.body;
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;
            parm = [parms.goodsUuid]

            sqlLink = 'select COUNT(*) from buy_goods where uuid=?'
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                    conns.release();
                } else {
                    if (rel[0]['COUNT(*)'] === 0) {
                        sqlLink = 'select id,name,price,saleNum,storeNum ,imgUrls from goods where id=? '
                        parm = [parms.goodsUuid]
                        conns.query(sqlLink, parm, function (err, rel) {
                            if (err) {
                                let s = err.message;
                                console.log(err.message)
                                res.send("数据读取失败");
                                conns.release();
                            } else {
                                sqlLink = 'insert into buy_goods (uuid,name,price,storeNum,imgUrl,num,state) values(?,?,?,?,?,?,?)'
                                parm = [rel[0].id, rel[0].name, rel[0].price, rel[0].storeNum, rel[0].imgUrls, 1, 1]
                                conns.query(sqlLink, parm, function (err, rel) {
                                    if (err) {
                                        let s = err.message;
                                        console.log(err.message)
                                        res.send("数据读取失败");
                                        conns.release();
                                    } else {
                                        console.log(rel, "insert")

                                        let json = {"msg": "success", "error": null, "data": null}
                                        res.send(json);
                                    }
                                })
                            }
                        })
                    } else {
                        sqlLink = "update buy_goods set num=num+1 where uuid=?"
                        parm = [parms.goodsUuid];
                        conns.query(sqlLink, parm, function (err, rel) {
                            if (err) {
                                let s = err.message;
                                console.log(err.message)
                                res.send("数据读取失败");
                                conns.release();
                            } else {
                                console.log(rel, "update")
                                let json = {"msg": "success", "error": null, "data": null}
                                res.send(json);
                            }
                        })
                    }
                    // res.send(rel);
                }
            })
        })
    },
    updataCarNum: (req, res) => {

        let son = conn();
        let parms = req.body;
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');</script>");
                return;
            }
            let sqlLink, parm;
            sqlLink = "update buy_goods set num=? where uuid=?"
            parm = [parms.num, parms.goodsUuid];
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                    conns.release();
                } else {
                    let json = {"msg": "success", "error": null, "data": null}
                    res.send(json);
                }
            })

        })
    },
    removeCarGoods: (req, res) => {
        let son = conn();
        let parms = req.body;
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');</script>");
                return;
            }
            let sqlLink, parm;

            sqlLink = "DELETE FROM buy_goods WHERE uuid = ?"
            parm = [parms.goodstUuid];
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                    conns.release();
                } else {
                    console.log(rel)
                    let json = {"msg": "success", "error": null, "data": null}
                    res.send(json);
                }
            })

        })
    },
    getGoodsDetail: (req, res) => {

        let son = conn();
        let parms = req.body;
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;

            sqlLink = "select  * from goods where id=?"
            parm = [parms.uuid]

            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                } else {
                    console.log(rel)
                    for (let s = 0; s < rel.length; s++) {
                        k = rel[s].imgUrls.split(',');
                        rel[s].imgUrls = k
                    }
                    res.send(rel);
                }
                conns.release();
            })
        })


    },
    getAddressList: (req, res) => {
        if(req.session.loginBean=== undefined){
            res.send({error:"用户未登录，无法获取到地址",msg:"用户未登录，无法获取到地址"})
            return;
        }
        let son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;
            sqlLink = 'select * from address where uid=?'

            parm = [req.session.loginBean.uid]
            // console.log(req.session.loginBean);
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                    conns.release();
                } else {
                    console.log(rel,"这是地址列表")
                    res.send(rel)
                }
            })
        })
    },
    addAddress:(req,res)=>{
        if(req.session.loginBean=== undefined){
            res.send({error:"用户未登录，无法添加",msg:"用户未登录，无法添加"})
            return;
        }
        let parms = req.body;
        let son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;
            sqlLink = 'insert into address (contact,phone,area,address,zipCode,first,uid) values(?,?,?,?,?,?,?)';

            parm = [parms.contact,parms.phone,parms.area,parms.address,parms.zipCode,parms.first,req.session.loginBean.uid];
            // console.log(req.session.loginBean);
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                    conns.release();
                } else {
                    console.log(rel,"这是地址列表")
                    res.send(rel)
                }
            })
        })
    },
    updataAddress:(req,res)=>{
        if(req.session.loginBean=== undefined){
            res.send({error:"用户未登录，无",msg:"用户未登录，无法修改"})
            return;
        }
        let parms = req.body;
        let son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;
            sqlLink = 'update address set contact=?,phone=?,area=?,address=?,zipCode=?,first=? where id=?';
            parm = [parms.contact,parms.phone,parms.area,parms.address,parms.zipCode,parms.first,parms.addressUuid];
            // console.log(req.session.loginBean);
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                    conns.release();
                } else {
                    console.log(rel,"这是地址列表")
                    res.send(rel)
                }
            })
        })
    },
    removeAddress:(req,res)=>{
        if(req.session.loginBean=== undefined){
            res.send({error:"用户未登录，无",msg:"用户未登录，无法操作"})
            return;
        }
        let parms = req.body;
        let son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let sqlLink, parm;
            sqlLink = 'DELETE FROM address WHERE id=?';
            parm = [parms.addressUuid];
            console.log(parm)
            // console.log(req.session.loginBean);
            conns.query(sqlLink, parm, function (err, rel) {
                if (err) {
                    let s = err.message;
                    console.log(err.message)
                    res.send("数据读取失败");
                    conns.release();
                } else {
                    res.send({"msg": "success", "error": null, "data": null})
                }
            })
        })
    },
}