let submitDataJson = [];
let forma1 = (data, rel) => {
    return <img src={CTX_PATH + data[rel.field]} style={{height: "50", width: "50"}}/>
}
let forma3 = (data, rel, that) => {
    setTimeout("A.able()", 100);
    return that.state.num * parseInt(data.price)
}
let forma2 = (data, rel, that) => {
    if (that.state.num === "i have not be Initialization") {
        let s = {uuid: data.uuid||data.id, num: parseInt(data.num)};
        submitDataJson = [...submitDataJson, s];
        that.setState(() => {
            return {num: data.num}
        })
    }
    return <div className="buyCarGoodsNum" style={{width: "auto"}}>
        <a onClick={() => {
            let num = that.state.num;
            if (num >= 0 && num < parseInt(data.storeNum)) {
                that.setState({num: ++num}, () => {
                    for (let i = 0, vlen = submitDataJson.length; i < vlen; i++) {
                        if(data.uuid){
                            if (submitDataJson[i].uuid == data.uuid ) {
                                ++submitDataJson[i].num
                                break;
                            }
                        }else{
                            if (submitDataJson[i].uuid == data.id ) {
                                ++submitDataJson[i].num
                                break;
                            }
                        }

                    }
                });
            }
        }}>+</a>
        <input type="number" min="0" value={that.state.num} onChange={(e) => {
            if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= parseInt(data.getNum)) {
                that.setState({num: parseInt(e.target.value)}, () => {
                    for (let i = 0, vlen = submitDataJson.length; i < vlen; i++) {
                        if (submitDataJson[i].uuid == data.uuid) {
                            submitDataJson[i].num = parseInt(e.target.value);
                            break;
                        }
                    }
                });
            } else if (parseInt(e.target.value) > parseInt(data.getNum)) {
                that.setState({num: parseInt(data.getNum)}, () => {
                    for (let i = 0, vlen = submitDataJson.length; i < vlen; i++) {
                        if (submitDataJson[i].uuid == data.uuid) {
                            submitDataJson[i].num = parseInt(data.getNum);
                            break;
                        }
                    }
                });
            } else {
                that.setState({num: 0}, () => {
                    for (let i = 0, vlen = submitDataJson.length; i < vlen; i++) {
                        if (submitDataJson[i].uuid == data.uuid) {
                            submitDataJson[i].num = 0;
                            break;
                        }
                    }
                });
            }
        }}/>
        <a onClick={() => {
            let num = that.state.num;
            if (num > 0) {
                that.setState({num: --num}, () => {
                    for (let i = 0, vlen = submitDataJson.length; i < vlen; i++) {
                        if (submitDataJson[i].uuid == data.uuid) {
                            --submitDataJson[i].num
                            break;
                        }
                    }
                });
            }
        }}>-</a>
    </div>
}

let forma4 = (that) => {
    let s = strike();
    return (<div className="strikeAndButton">
        <div className="SABspan">
            总计&nbsp;:&nbsp;&nbsp;
            <strong>{s}云点</strong>
            <div onClick={() => {
                submitz()
            }} className="footButton" style={{top: "-7", backgroundColor: 'rgba(255, 165, 0, 0.83)'}}>结算
            </div>
        </div>
    </div>)
}
let forma5 = (that) => {
    if (that.state.strike === strike()) {
        return
    } else {
        that.setState({strike: strike()});
    }
}
let A, B, data1 = [{
        mainUrl: "../home", name: "平台首页", data: [{url: "https://www.teraee.com/?page_id=36090", name: "最新资讯"},
            {url: CTX_PATH + '/solution', name: "申请产品试用"},
            {url: "https://www.teraee.com/?page_id=37047", name: "在线演示"}]
    },
        {mainUrl: "../home", name: "商品首页"},
        {mainUrl: "../order/detail", name: "我的订单"}], detailTopNavs,
    data3 = [{name: "图片", width: "80", field: "imgUrl", formatter: forma1},
        {name: "名称", width: "200", field: "name"},
        {name: "单价", width: "80", field: "price"},
        {name: "数量", width: "150", field: "num", parameter: ["num"], formatter: forma2},
        {name: "总计", width: "80", field: "TotalPrice", formatter: forma3}],
    data5 = {
        bottom: true,
        pagination: false,
        pageSize: "50",
        custom: forma4,
        parameter: ["strike"],
        getFunction: forma5
    };

/**
 * 这是地址选择组件
 * 此组件需加载shopOrders.css
 *
 */



let AdressChoose = React.createClass({
    getInitialState: function () {
        let data = this.props.data;
        for (let s = 0; s < data.length; s++) {
            if (data[s].first === "true") {
                return {
                    chooseLi: s,
                    uuid: data[s].id
                }
            }
        }
        return {
            chooseLi: 0,
            uuid: data[0].id
        }
    },
    render: function () {
        let chose = this.state.chooseLi;
        let data = this.props.data;
        return (
            <div className="addressBody">
                <h3>
                    <span>确认收货地址</span>
                    <span className="managementAddress" onClick={this.jump}>管理收货地址</span>
                </h3>
                <ul>
                    {
                        data.map((rel, index) => {
                            return (
                                <li key={"addressLi-" + index}
                                    className={chose === index ? "addressWarp choose" : "addressWarp"} onClick={() => {
                                    this.chooseAdress(index, rel.id)
                                }}>
                                    <div className="addressIcon">
                                        <i className="iconfont icon-adress"></i>
                                        <span>寄送到</span>
                                    </div>
                                    <div className="adressWarpBox">
                                        <input type="radio" name="address" checked={chose === index}/>
                                        <span>{rel.area + rel.address}（{rel.contact} 收）
							<em>{rel.phone}</em>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <em hidden={rel.first !== "true"}>默认地址</em>
						</span>
                                        <a onClick={() => {
                                            openDialog(rel)
                                        }}>修改本地址</a>
                                    </div>
                                </li>)
                        })
                    }

                </ul>
            </div>
        )
    },
    chooseAdress: function (index, uuid) {
        this.setState({chooseLi: index, uuid: uuid})
    },
    jump: function () {
        window.open("./address")
    },
    getUuid: function () {
        return this.state.uuid;
    }
});

let ShopTable = React.createClass({
    render: function () {
        return (
            <div>
                <h2 className="shopTableH2">确认订单详情</h2>
                <MyTable {...this.props} ref={(MyTable) => {
                    this.MyTable = MyTable;
                }}/>
            </div>
        )
    },
    able: function () {
        this.MyTable.changestate()
    }
});

/*<div className="strike">
						<div className="sumAdd">
							<span>合计:</span>
							<strong></strong>
						</div>
						<div className="strikeButton">
							<a>结算</a>
						</div>
					</div>*/

(function () {
    detailTopNavs = ReactDOM.render(
        <HomeTopNav></HomeTopNav>,
        document.getElementById('TopNav')
    );
    $.ajax({
        url: CTX_PATH + '/user/isLogin',
        type: 'post',
        success: function (rtn) {
            console.log('is login data:%o', rtn);
            if (!rtn.error) {
                detailTopNavs.setState({login: rtn.data});
            } else {
                layer.msg(rtn.msg);
            }
        }

    });

})();
(function () {
    ReactDOM.render(
        <SidebarNav data={data1}></SidebarNav>,
        document.getElementById("SGDsidebarNav")
    )
})();

function LoadingAddress() {
    $.ajax({
        url: CTX_PATH + "/shop/api/address/list",
        type: 'post',
        success: function (rel) {
            if (!rel.error) {
                if (rel === null || rel.length === 0) {
                    layer.msg("您尚未有保存的地址，请先添加地址后再结算，3S后跳入地址添加界面！");
                    setTimeout(function () {
                        window.open(CTX_PATH + "/shop/address", "_self");
                    }, 3000)
                } else {
                    B = ReactDOM.render(
                        <AdressChoose data={rel}></AdressChoose>,
                        document.getElementById("addressChoose")
                    )
                }
            } else {
                layer.msg(rel.msg);
            }
        }
    });

}

LoadingAddress();
(function () {
    const url = parseURLs(window.location.href);
    if (url === "" || url.uuid === undefined || url.num === undefined) {
        $.ajax({
            url: CTX_PATH + "/shop/api/cart/goods/page",
            type: 'post',
            data: {
                pageNum: "1",
                pageSize: "1000"
            },
            success: function (rel) {
                if (!rel.error) {
                    A = ReactDOM.render(
                        <ShopTable WatchHead={data3} data={rel} WatchButtom={data5}/>,
                        document.getElementById("orders")
                    )
                } else {
                    layer.msg(rel.msg);
                }
            }
        });
    } else {
        $.ajax({
            url: CTX_PATH + "/shop/api/goods/detail",
            type: 'post',
            data: url,
            success: function (rel) {
                if (!rel.error) {
                    let myData = [];
                    let D = rel[0];
                    D.num = url.num;
                    D.imgUrl = D.imgUrls[0];
                    myData[0] = D;
                    A = ReactDOM.render(
                        <ShopTable WatchHead={data3} data={myData} WatchButtom={data5}/>,
                        document.getElementById("orders")
                    )

                } else {
                    layer.msg(rel.msg);
                }
            }
        });
    }


})();

function submitz() {
    let uuids = [];
    for (let s = 0; s < submitDataJson.length; s++) {
        for (let k = 0; k < submitDataJson[s].num; k++) {
            uuids = [...uuids, submitDataJson[s].uuid]
        }
    }
    if (uuids.length === 0) {
        layer.msg("尚未选择购买的商品，无法结算！");
        return;
    } else if (B === undefined) {
        layer.msg("尚未选择地址，无法结算！");
        return;
    }
    $.ajax({
        url: CTX_PATH + "/shop/api/buy",
        type: 'post',
        traditional: true,
        data: {
            uuids: uuids,
            addressId: B.getUuid()
        },
        success: function (rel) {
            if (!rel.error) {
                layer.msg("购买成功,3S后跳转到订单页面");
                const url = parseURLs(window.location.href);
                if (url === "" || url.uuid === undefined || url.num === undefined) {
                    for (let i = 0; i < submitDataJson.length; i++) {
                        deletBuyCar(submitDataJson[i].uuid)
                    }
                }
               setTimeout(function () {
                    window.open(CTX_PATH + "/order/detail", "_self");
                }, 3000)
            } else {
                layer.msg(rel.msg);
            }
        }
    });
}

let layerIndex;
initSelection()

function openDialog(data) {
    $("#getProvinces").val(data.area);
    $("#detailedAdr").val(data.address);
    $("#zipCodA").val(data.zipCode);
    $("#Consignee").val(data.contact);
    $("#ConsigneePhone").val(data.phone);
    $("#defaultz").prop("checked", data.first);
    ;
    $("#uuidHidden").val(data.id);
    layerIndex = layer.open({
        type: 1,
        title: "修改地址",
        content: $("#addressAbout"),
        resize: false,
        scrollbar: false,
        area: ['900px', '500px']
    });
}

$("#submitAdr").on("click", function () {
    let key = 0;
    let detailedAdr = $("#detailedAdr");
    let Consignee = $("#Consignee");
    let ConsigneePhone = $("#ConsigneePhone");
    let defaultz = $("#defaultz");
    let getProvinces = $("#getProvinces");
    if (detailedAdr.val().length < 5 || detailedAdr.val().length > 120) {
        key = 1;
        detailedAdr.css("border-color", "red").next("div").children(".rowTip").css("display", "inline-block");
    } else {
        detailedAdr.css("border-color", "#afafaf").next("div").children(".rowTip").css("display", "none");
    }


    if (Consignee.val().length < 2 || Consignee.val().length > 25) {
        key = 1;
        Consignee.css("border-color", "red").next("div").children(".rowTip").css("display", "inline-block");
    } else {
        Consignee.css("border-color", "#afafaf").next("div").children(".rowTip").css("display", "none");
    }

    if (!phoneValidator(ConsigneePhone.val())) {
        key = 1;
        ConsigneePhone.css("border-color", "red").next("div").children(".rowTip").css("display", "inline-block");
    } else {
        ConsigneePhone.css("border-color", "#afafaf").next("div").children(".rowTip").css("display", "none");
    }

    if (getProvinces.val().length < 2) {
        key = 1;
        getProvinces.css("border-color", "red").nextAll("div").children(".rowTip").css("display", "inline-block");
    } else {
        getProvinces.css("border-color", "#afafaf").nextAll("div").children(".rowTip").css("display", "none");
    }
    if (key === 0) {
        $.ajax({
            url: CTX_PATH + "/shop/api/address/update",
            type: 'post',
            data: {
                addressUuid: $("#uuidHidden").val(),
                contact: $("#Consignee").val(),
                area: getProvinces.val(),
                address: $("#detailedAdr").val(),
                phone: $("#ConsigneePhone").val(),
                zipCode: $("#zipCodA").val(),
                first: $("#defaultz").is(':checked')
            },
            success: function (rel) {
                if (!rel.error) {
                    layer.close(layerIndex);
                    LoadingAddress();
                    layer.msg("修改地址成功！");
                } else {
                    layer.msg(rel.msg);
                }
            }
        });

    }
});

function clearAdrData() {
    initSelection();
    $("#detailedAdr").val("");
    $("#zipCodA").val("");
    $("#Consignee").val("");
    $("#ConsigneePhone").val("");
    $("#defaultz").attr("checked", false);
}

function setAdrData(a, b, c, d, e, f) {
    $("#detailedAdr").val(b);
    $("#zipCodA").val(c);
    $("#Consignee").val(d);
    $("#ConsigneePhone").val(e);
    $("#defaultz").attr("checked", f);
}

$("#selLev2,#selLev0,#selLev1").on("change", function () {
    $("#zipCodA").val($(this).val());
})

$("#getProvinces").on("click", function () {
    $("#selLev2,#selLev0,#selLev1").css("display", "inline-block");
})

function parseURLs(url) {
    var url = url.split("?")[1];
    if (url === undefined) {
        return "";
    }
    var para = url.split("&");
    var len = para.length;
    var res = {};
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr = para[i].split("=");
        res[arr[0]] = arr[1];
    }
    return res;
}

function deletBuyCar(uuid) {
    $.ajax({
        url: CTX_PATH + "/shop/api/cart/remove",
        type: 'post',
        data: {
            goodstUuid: uuid
        },
        success: function (rel) {
            if (!rel.error) {

            } else {
                layer.msg(rel.msg);
            }
        }
    });
}