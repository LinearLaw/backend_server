const express = require("express");
const app = express();
const config = require("./config/config.js");
const router = require("./router/router.js")
const session = require("express-session");

//body-parser处理post请求
// const bodyParser = require("body-parser")
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(session(config.session));
app.all("*",function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/**
 * @description  路由
 */
app.get("/",(req,res)=>{
  console.log("用户访问了主页");
  res.send("Welcome!");
})
app.get("/login"  , (req,res)=>{    res.render("login");    })
app.get("/signup" , (req,res)=>{    res.render("signup");   })

app.post("/dosignup",router.userSignup);
app.post("/dologin",router.userLogin);

app.get("/dogetshop",router.getShop);
app.post("/doeditshop",router.editShop);
app.post("/doaddshop",router.addShop);

//当post请求的 content-type不是one of the 
//  “application/x-www-form-urlencoded, 
//    multipart/form-data, or text/plain”, Preflighted requests就会被发起，会出现options请求。

/**
 * @description  当请求无效时，返回提示请求出错。
 */
app.use(function(req,res){
  res.send("Request Error.");
})

/**
 * [description] 开启服务，监听端口请求
 */
app.listen(config.port,function(err){
  if(err) {
    console.log("error");
    return;
  }
  console.log("正在监听端口请求...");
})