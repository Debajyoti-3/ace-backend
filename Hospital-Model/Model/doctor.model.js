import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    experienceInYear:{
        type:Number,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    workingHospitals:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
        }
    ],
    
},{timestamps:trrue})