const express = require("express");
const router = express.Router();

const config = require("../config/config.js");
const userControl = require("../controller/user-control.js");
const shopControl = require("../controller/shop-control.js");

//登录过滤
function filter(req,res,cb){
  if(!config.forbidden){
    res.send({
      status:-1,
      content:"该用户未登录！"
    })
    return;
  }else{
    cb(req,res);
  }
}

//user-service
router.post("/dosignup" , userControl.userSignup);
router.post("/dologin"  , userControl.userLogin);

//shop-service
router.get( "/dogetshop"   , filter(req , res , shopControl.getShop));
router.post("/doeditshop"  , filter(req , res , shopControl.editShop));
router.post("/doaddshop"   , filter(req , res , shopControl.addShop));

module.exports = router;
