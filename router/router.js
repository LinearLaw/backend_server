const config = require("../config/config.js")
const userControl = require("../controller/user-control.js");
const shopControl = require("../controller/shop-control.js");

//user-service
exports.userSignup = userControl.userSignup;
exports.userLogin = userControl.userLogin;

//shop-service
exports.addShop = function(req,res){
  if(!config.forbidden){
    return;
  }else{
    shopControl.addShop(req,res);
  }
}
exports.editShop = function(req,res){
  if(!config.forbidden){
    return;
  }else{
    shopControl.editShop(req,res);
  }
}
exports.getShop = function(req,res){
  if(!config.forbidden){
    res.send({
      status:-1,
      content:"该用户未登录！"
    })
    return;
  }else{
    shopControl.getShop(req,res);
  } 
}