import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:[true,'amount is required']
    },
    category:{
        type:String,
        require:[true,'Category is required']
    },
    type:{
        type:"String",
        require:[true,"Type is required"]
    },
    refrence:{
        type:String,
    },
    description:{
        type:String,
        require:[true,'Description is required']
    },
    date:{
        type:Date,
        require:[true,'Date is required']
    },
   
},{timestamps: true})

export default mongoose.model("transactions", transactionSchema);
