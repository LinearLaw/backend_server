const mongoose = require("mongoose");
const db = require("./db.js");

const shopSchema = new mongoose.Schema({
    userId      :   {   type:String },
    shopId      :   {   type:Number },      //店铺id
    createDate  :   {   type:Number },
    shopLogo    :   {   type:String },

    shopname    :   {   type:String },
    shoptype    :   {   type:Number },      //店铺类别，个人店铺 or 企业店铺
    shopDetail  :   {   type:String },
    agreement   :   {   type:String },
    multishop   :   [                       //第三方店铺链接   
        {
            platname:{ type:String },
            url:{type:String}
        } 
    ],
    products    :   [       //商品列表
        {
            productId   :   {   type:Number     },  //商品id，
            productType :   {   type:String     },  //商品类别
            productAuth :   {   type:Number     }
        }
    ]
})

const Shop = mongoose.model("Shop",shopSchema);

module.exports = Shop;

