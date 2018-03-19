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