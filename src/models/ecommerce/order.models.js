import mongoose from "mongoose";
//Mini model
const orderItemSchema = new mongoose.Schema({
    orderName : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        default : 0
    }
},{timestamps:true})
const orderSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    address : {
        type : String,
        required : true
    },
    oredrItems : {
        type : [orderItemSchema]
    },
    status : {
        type : String,
        enum : ["Pending","Delivered","Cancelled"],
        default : "Pending"
    }

},{timestamps : true})

export const Order = mongoose.model("Order",orderSchema)