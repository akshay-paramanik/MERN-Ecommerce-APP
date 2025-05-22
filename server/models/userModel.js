const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: { type: Array, required: true }, // or more specific structure
    status: { type: String, default: 'Ordered' }, // 'Pending', 'Shipped', 'Delivered', etc.
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    orderedAt: { type: Date, default: Date.now }
});


const userSchema = mongoose.Schema({
    name:{
       type: String,
       required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0,
    },
    cart:{
        type:Array,
        default:[]
    },
    order:{
        type: [orderSchema],
        default:[]
    },
},{
    timestamps:true,
})

module.exports = mongoose.model("Users",userSchema)