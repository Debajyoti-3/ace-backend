import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({   // _id will automatically generate by MongoDB
    content:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

export const Tweet = mongoose.model("Tweet",tweetSchema)