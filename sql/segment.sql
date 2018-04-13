/*
Navicat MySQL Data Transfer

Source Server         : 我的主机
Source Server Version : 50556
Source Host           : 139.199.195.224:3306
Source Database       : segment

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-04-13 11:44:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `address`
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `contact` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `area` varchar(100) NOT NULL,
  `address` varchar(300) NOT NULL,
  `zipCode` int(10) NOT NULL,
  `first` varchar(5) NOT NULL,
  `uid` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('7', '李云明', '13975840216', '河北省唐山市开平区', '解放路上陵大道21号', '130205', 'false', '2');
INSERT INTO `address` VALUES ('8', '李成伟', '15648794561', '辽宁省本溪市明山区', '长廊街口28号', '210504', 'true', '2');
INSERT INTO `address` VALUES ('9', '周曦', '13975840216', '江苏省连云港市海州区', '新洲大道92号', '320706', 'false', '1');
INSERT INTO `address` VALUES ('10', '张谷拉', '15348721665', '江西省鹰潭市余江县', '流星乡木兰村56号', '360622', 'true', '1');
INSERT INTO `address` VALUES ('11', '社会', '18569539014', '湖南省长沙市雨花区', '21312312312312312', '430111', 'true', '3');
INSERT INTO `address` VALUES ('12', '12313', '18522222222', '湖南省长沙市雨花区', '23123123', '430111', 'false', '3');

-- ----------------------------
-- Table structure for `buy_goods`
-- ----------------------------
DROP TABLE IF EXISTS `buy_goods`;
CREATE TABLE `buy_goods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) NOT NULL,
  `imgUrl` varchar(300) NOT NULL,
  `name` varchar(50) NOT NULL,
  `state` int(10) NOT NULL,
  `num` int(10) NOT NULL,
  `storeNum` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buy_goods
-- ----------------------------
INSERT INTO `buy_goods` VALUES ('25', '2', '/images/shop/c12b6f14-ef5a-4414-a4d8-151b9d7dc75a.jpg,/images/shop/47460283-aee7-4a10-bf9d-15c43946169c.jpg', '小米迷你充电宝', '1', '2', '15', '120');
INSERT INTO `buy_goods` VALUES ('26', '1', '/images/shop/cde1d1a1-8138-4a81-b0f4-1c90dbe75e7c.jpg', '创意陶瓷杯子大容量水杯马克杯', '1', '1', '66', '99');

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` int(50) NOT NULL,
  `saleNum` int(50) NOT NULL,
  `storeNum` int(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `imgUrls` varchar(1000) NOT NULL,
  `categoryUuid` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '创意陶瓷杯子大容量水杯马克杯', '99', '74', '66', '创意陶瓷杯子大容量水杯马克杯,真的大', '/images/shop/cde1d1a1-8138-4a81-b0f4-1c90dbe75e7c.jpg', '17dce7bd-6cdb-4e2b-a3e0-a5e3f049f231');
INSERT INTO `goods` VALUES ('2', '小米迷你充电宝', '120', '23', '15', '小米迷你充电宝10000毫安', '/images/shop/c12b6f14-ef5a-4414-a4d8-151b9d7dc75a.jpg,/images/shop/47460283-aee7-4a10-bf9d-15c43946169c.jpg', '34808a2b-3ade-4c59-91ad-d94d56b3bbe8');

-- ----------------------------
-- Table structure for `question`
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `qid` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeid` int(11) NOT NULL,
  `title` varchar(240) CHARACTER SET utf8 NOT NULL,
  `content` varchar(600) CHARACTER SET utf8 NOT NULL,
  `uid` bigint(20) NOT NULL,
  `looknum` bigint(20) DEFAULT '0',
  `renum` int(11) DEFAULT '0',
  `finished` tinyint(4) DEFAULT NULL,
  `updtime` timestamp NULL DEFAULT NULL,
  `createtime` timestamp NULL DEFAULT NULL,
  `questionTypeName` varchar(240) CHARACTER SET utf8 DEFAULT NULL,
  `uname` varchar(240) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of question
-- ----------------------------

-- ----------------------------
-- Table structure for `replies`
-- ----------------------------
DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `rpid` bigint(11) NOT NULL AUTO_INCREMENT,
  `qid` bigint(11) NOT NULL,
  `content` text CHARACTER SET utf8,
  `uid` bigint(11) DEFAULT NULL,
  `nicheng` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `createtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`rpid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of replies
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) CHARACTER SET utf8 NOT NULL,
  `pwd` varchar(60) CHARACTER SET utf8 NOT NULL,
  `nicheng` varchar(120) CHARACTER SET utf8 NOT NULL,
  `updtime` timestamp NULL DEFAULT NULL,
  `createtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'leijialong520@qq.com', '123456', '雷哥真棒', null, '2018-04-10 09:29:11');
INSERT INTO `user` VALUES ('2', 'ljl@qq.co', '123456', 'asdasdad', null, '2018-04-10 09:34:49');
INSERT INTO `user` VALUES ('3', '123456@qq.com', '123456', '社会', null, '2018-04-10 10:39:00');

-- ----------------------------
-- Table structure for `UserBuyList`
-- ----------------------------
DROP TABLE IF EXISTS `UserBuyList`;
CREATE TABLE `UserBuyList` (
  `address` varchar(100) NOT NULL,
  `createTime` varchar(100) NOT NULL,
  `finishTime` varchar(100) DEFAULT NULL,
  `goods` varchar(1000) NOT NULL,
  `payTime` varchar(100) DEFAULT NULL,
  `receiver` varchar(50) NOT NULL,
  `uuid` int(50) NOT NULL AUTO_INCREMENT,
  `state` int(2) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `num` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of UserBuyList
-- ----------------------------
INSERT INTO `UserBuyList` VALUES ('江西省鹰潭市余江县流星乡木兰村56号', '2018-04-10 09:43:05', null, '2,1', '2018-04-10 09:43:05', '张谷拉', '17', '2', '1', '1,2');
INSERT INTO `UserBuyList` VALUES ('江西省鹰潭市余江县流星乡木兰村56号', '2018-04-10 09:44:54', null, '2', '2018-04-10 09:44:54', '张谷拉', '18', '2', '1', '3');
INSERT INTO `UserBuyList` VALUES ('江苏省连云港市海州区新洲大道92号', '2018-04-10 09:45:06', null, '2', '2018-04-10 09:45:06', '周曦', '19', '2', '1', '2');
INSERT INTO `UserBuyList` VALUES ('湖南省长沙市雨花区21312312312312312', '2018-04-10 10:41:52', null, '2', '2018-04-10 10:41:52', '社会', '20', '2', '3', '1');
