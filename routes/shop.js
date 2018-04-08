var express = require('express');
var router = express.Router();
var goodsModel = require('../model/goodsModels')

router.post('/banners', (req, res) => {
//参数：imgUrl，targetUrl，type
    let json = {
        data: [{imgUrl: '/images/shop/banner1.jpg', targetUrl: 'http://www.baidu.com', type: 0},
            {imgUrl: '/images/shop/banner5.jpg', targetUrl: 'http://www.baidu.com', type: 0}]
    };
    res.send(json)
})

router.post("/category/all", (req, res) => {
    let json = {
        "msg": null,
        "error": null,
        "data": [
            {
                "uuid": "5",
                "name": "家用电器",
                "childs": [
                    {
                        "uuid": "7",
                        "name": "小工具",
                        "childs": []
                    },
                    {
                        "uuid": "50bcb318-c06d-47e5-bc13-28f480327150",
                        "name": "测试",
                        "childs": []
                    },
                    {
                        "uuid": "87e06abc-7c05-4e44-bf16-28662964c593",
                        "name": "小音箱",
                        "childs": []
                    },
                    {
                        "uuid": "34808a2b-3ade-4c59-91ad-d94d56b3bbe8",
                        "name": "电子",
                        "childs": []
                    }
                ]
            },
            {
                "uuid": "56e567ba-0398-4002-8b16-10662496be9e",
                "name": "办公",
                "childs": [
                    {
                        "uuid": "ae7fd164-2ce1-4b8a-b2ea-e1866b95a737",
                        "name": "数码",
                        "childs": []
                    },
                    {
                        "uuid": "3d9398d8-e2aa-4f39-8be1-267ebdd2c35e",
                        "name": "文具",
                        "childs": []
                    }
                ]
            },
            {
                "uuid": "ecc7e22b-baa2-4485-bf97-28184da3f919",
                "name": "家居",
                "childs": [
                    {
                        "uuid": "04b72267-c6c9-43f0-9320-7770ce180730",
                        "name": "抱枕",
                        "childs": []
                    },
                    {
                        "uuid": "17dce7bd-6cdb-4e2b-a3e0-a5e3f049f231",
                        "name": "水杯",
                        "childs": []
                    }
                ]
            }
        ]
    }
    res.send(json)
})
router.post("/goods/page", (req, res) => {
    goodsModel.goodsAbout(req,res)
})
router.post("/cart/goods/page", (req, res) => {
    goodsModel.buyCarList(req,res)
})
router.post("/cart/add", (req, res) => {
    goodsModel.addCar(req,res)
})
router.post("/cart/update", (req, res) => {
    goodsModel.updataCarNum(req,res)
})
router.post("/cart/remove", (req, res) => {
    goodsModel.removeCarGoods(req,res)
})
router.post("/goods/detail", (req, res) => {
    goodsModel.getGoodsDetail(req,res)
})
router.post("/address/list", (req, res) => {
    goodsModel.getAddressList(req,res)
})
router.post("/address/add", (req, res) => {
    goodsModel.addAddress(req,res)
})
router.post("/address/update", (req, res) => {
    goodsModel.updataAddress(req,res)
})
router.post("/address/remove", (req, res) => {
    goodsModel.removeAddress(req,res)
})
router.post("/buy", (req, res) => {
    goodsModel.buyGoods(req,res)
})
router.post("/order/page", (req, res) => {
    goodsModel.orderList(req,res)
})
module.exports = router;
