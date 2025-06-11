import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber:{
        type:   Schema.Types.objecectId,
        ref: "User"
    },
    channel:{
        type: Schema.Types.objecectId,
        ref: "User"
    }
},{
    timestamps:true
})

export const Subscription = mongoose.model("Subscription",subscriptionSchema)