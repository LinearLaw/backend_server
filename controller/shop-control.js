const User = require("../models/User.js");
const Shop = require("../models/Shop.js");
const config = require("../config/config.js");
const formidable = require('formidable');
const md5 = require("../models/md5.js");

exports.addShop = (req,res)=>{
  try{
    new Promise((resolve)=>{
        let form = new formidable.IncomingForm();
        form.parse(req,(err,fields,files)=>{
            User.find({"userId":req.session.UID},function(err,result){
              if(err){
                res.send({
                  status:2,
                  content:"server error , try again"
                })
              }
              if(result.length <= 0){
                res.send({
                    status:3,
                    content:"user not exist"
                })
              }
              if(req.session.UID != result[0]["userId"]){
                res.send({
                  status:4,
                  content:"server error"
                })
              } 
              let shopObj = {
                userId      :   req.session.UID,
                shopId      :   result[0]["shopId"],                   //店铺id
                shopname    :   fields.shopname,
                createDate  :   new Date().getTime(),
                shopLogo    :   "",
                shopDetail  :   fields.shopDetail,
                shoptype    :   fields.shoptype,      //店铺类别，0：个人店铺 or 1：企业店铺
                multishop   :   fields.multishop,
                products    :   []
              }
              let newShop = new Shop(shopObj);
              newShop.save(function(err){
                  res.send({
                      status:1,
                      content:"success"
                  })
              })
            })
        })
    })
  }catch(err){
    console.log(err);
    res.send({
      status:-1,
      content:err
    })
  }
}

exports.getShop = (req,res)=>{
  try{
    let promiseFun = new Promise((resolve)=>{
        User.find({"userId":req.session.UID},function(err,result){
          if(err){
            res.send({
              status:2,
              content:"server error , try again"
            })
          }
          if(result.length <= 0){
            res.send({
                status:3,
                content:"user not exist"
            })
          }
          if(req.session.UID != result[0]["userId"]){
            res.send({
              status:4,
              content:"server error"
            })
          } 
          resolve(result);
        })
    })
    promiseFun.then((result)=>{
      console.log(123,result[0])
      Shop.find({"shopId":result[0]["shopId"]},(err,shopResult)=>{
        console.log(shopResult);
        if(err || shopResult == undefined){
          res.send({
            status:5,
            content:"店铺信息未创建"
          })
        }
        res.send({
          status:1,
          content:"success",
          data:shopResult[0]
        })
      })
      
    })
  }catch(err){
    console.log(err);
    res.send({
      status:-1,
      content:err
    })
  }
}

exports.editShop = (req,res)=>{
    try{
    let promiseFun = new Promise((resolve)=>{
        let form = new formidable.IncomingForm();
        form.parse(req,(err,fields,files)=>{
            User.find({"userId":req.session.UID},function(err,result){
              if(err){
                res.send({
                  status:2,
                  content:"user server error , try again"
                })
                return;
              }
              if(result.length <= 0){
                res.send({
                    status:3,
                    content:"user not exist"
                })
                return;
              }
              if(req.session.UID != result[0]["userId"]){
                res.send({
                  status:4,
                  content:"server error"
                })
                return;
              } 
              let shopObj = {
                userId      :   req.session.UID,
                shopId      :   result[0]["shopId"],                   //店铺id
                shopname    :   fields.shopname,
                createDate  :   new Date().getTime(),
                shopLogo    :   "",
                shopDetail  :   fields.shopDetail,
                shoptype    :   fields.shoptype,      //店铺类别，0：个人店铺 or 1：企业店铺
                multishop   :   fields.multishop,
                products    :   []
              }
              //待补完
              resolve(shopObj);
            })
        })
    })
    promiseFun.then((shopObj)=>{
      Shop.find({"shopId":shopObj["shopId"]},(err,shopResult)=>{
        if(err){
          res.send({
            status:6,
            content:"shop server error , try again"
          })
          return;
        }
        if(shopResult == undefined){
          let newShop = new Shop(shopObj);
          newShop.save(function(err){
            res.send({
              status:1,
              content:"success",
              data:shopObj
            })
            return;
          })
        }
        res.send({
          status:1,
          content:"success"
        })
      })
    })
  }catch(err){
    console.log(err);
    res.send({
      status:-1,
      content:err
    })
  }
}