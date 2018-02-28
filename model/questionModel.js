var conn = require("./ConnPool")
var async = require("async");
module.exports = {
    askTijiao: function (req, res) {
        console.log("进来了提问 的提交这里了！");
        conn().getConnection(function (err, conns) {
            if (err) {
                res.send(err.message);
                return;
            }
            //title typeid content session.uid
            let link = "insert into question (title,typeid,content,uid,questionTypeName,uname,createtime) values(?,?,?,?,?,?,current_timestamp)"
            conns.query(link, req.params, function (err) {
                if (err) {
                    console.log("后面出错了");
                    console.log(err.message);
                    res.send(err.message);
                }
                // res.send("<script>alert('提问成功！');history.back();history.back();</script>");
                res.redirect("/");

                conns.release();
            })

        })
    },
    getAllQuestion: function (req, res, loginBean) {
        var page = req.query.page;
        var son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }
            let pageSize = 3;
            if (page == undefined || page <= 1) {
                page = 1;
            }
            let sqlCount = "select count(*) as count from question"
            let sqlSentence = "select qid,title,looknum,renum,finished,updtime,createtime from question order by qid desc limit ?,?";
            let parm = [(page - 1) * pageSize, pageSize];
            async.series({
                one: function (rel) {
                    conns.query(sqlCount, function (err, rels) {
                        rel(null, rels);
                    })
                },
                two: function (rel) {
                    conns.query(sqlSentence, parm, function (err, rels) {
                        rel(null, rels);
                    })
                }

            }, function (err, rel) {
                let maxPage = Math.ceil(parseInt(rel["one"][0]["count"]) / pageSize);
                let pages = {"page": page, "maxPage": maxPage}
                if (rel["two"].length == 0) {
                    if (loginBean === undefined) {
                        res.render("index", {title: "", loginBeans: loginBean, question: rel["two"], page: pages});
                    } else {
                        res.render("index", {
                            title: loginBean.nicheng + "的",
                            loginBeans: loginBean,
                            question: rel["two"],
                            page: pages
                        });
                    }
                    return;
                }

                if (page <= maxPage) {
                    if (loginBean === undefined) {
                        res.render("index", {title: "", loginBeans: loginBean, question: rel["two"], page: pages});
                    } else {
                        res.render("index", {
                            title: loginBean.nicheng + "的",
                            loginBeans: loginBean,
                            question: rel["two"],
                            page: pages
                        });
                    }
                } else {
                    res.redirect("/?page=" + maxPage)
                }
                conns.release();
                console.log(rel);
            })

        })


    }, getCount: function (req, res) {
        var qid = req.query.qid;
        var son = conn();
        son.getConnection(function (err, conns) {
            if (err) {
                res.send("<script>alert('操作失败，请重试！');history.back();</script>");
                return;
            }

            let sqlCountAdd = " UPDATE question SET looknum =looknum+1 WHERE qid=?";
            let sqlSentence = "select qid,uid,uname,content,title,looknum,renum,finished,updtime,createtime,typeid from question where qid=?";
            let sqlSentenceOther = "select qid,uid,rpid,content,nicheng,createtime from replies where qid=?";
            let parm = [qid];
            async.series({
                one: function (rel) {
                    conns.query(sqlCountAdd, parm, function (err, rels) {
                        rel(null, 1);
                    })
                },
                two: function (rel) {
                    conns.query(sqlSentence, parm, function (err, rels) {
                        rel(null, rels);
                    })
                }, three: function (rel) {
                    conns.query(sqlSentenceOther, parm, function (err, rels) {
                        rel(null, rels);
                    })
                }

            }, function (err, rel) {
                let loginBean = req.session.loginBean;
                if (loginBean === undefined) {
                    res.render("queDetil", {title: "", loginBeans: loginBean, rs: rel["two"],re:rel["three"]});
                } else {
                    res.render("queDetil", {title: loginBean.nicheng + "的", loginBeans: loginBean, rs: rel["two"],re:rel["three"]})
                }
                conns.release();
                console.log(rel);

            })

        })


    },
    reply: function (req, res, loginBean) {
        console.log("YSE");
        pool = conn();
        sql1 = 'insert into replies (qid,content,uid,nicheng) value(?,?,?,?)';
        param1 = [req.body['qid'], req.body['content'], loginBean.uid, loginBean.nicheng];
        sql2 = 'update question set renum=renum+1 where qid=?';
        param2 = [req.body['qid']];
        console.log(param2);
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log('有错');
                res.send("拿不到连接:" + err);
                return;
            }
            conn.beginTransaction(function (err) {
                if (err) {
                    console.log('有错111');
                    //return callback(err, null);
                    res.send('启动事物处理出错');
                    return;
                }
                console.log("准备串行；")
                async.series([ //串行series,并行parallel
                    function (callback) {
                        conn.query(sql1, param1, function (err, rs) {
                            if (err) {
                                console.log('有错' + err.message);
                                callback(err, 1);
                                return;
                            }
                            //console.log('执行第1条完毕');
                            callback(err, rs);//没有则callback(null,1);第2个参数是返回结果
                        });
                    },
                    function (callback) {
                        conn.query(sql2, param2, function (err, rs) {
                            if (err) {
                                console.log('有错' + err.message);
                                callback(err, 2);
                                return;
                            }
                            //console.log('执行第1条完毕');
                            callback(err, rs);//没有则callback(null,1);第2个参数是返回结果
                        });
                    }
                ], function (err, result) {
                    console.log(result[1].changedRows);
                    if (err || result[1].changedRows == 0) {
                        //console.log('调用回滚1');
                        conn.rollback(function () {
                            //throw err;
                        });
                        if (err) {
                            res.send('数据库错误:' + err);
                        } else {
                            res.send('未找到正确该用户');
                        }
                        return;
                    }
                    // 提交事务
                    conn.commit(function (err) {
                        if (err) {
                            console.log('调用回滚2');
                            conn.rollback(function () {
                                //throw err;
                            });
                            res.send('数据库错误:' + err);
                            console.log('提交事物出错');
                        }
                        res.send('回复成功');
                        console.log('success!');
                    });
                });
            });
            conn.release();
        });
    }
}