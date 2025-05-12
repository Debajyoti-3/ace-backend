import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    bedCapacity:{
        type:Number,
        required:true
    },
    pin:{
        type:String,    // best practice is to type String
        required:true
    },
    specializedIn:[
        {
            type:String
        }
    ]
},{timestamps:true})

export const Hospital = mongoose.model("Hospital",hospitalSchema)