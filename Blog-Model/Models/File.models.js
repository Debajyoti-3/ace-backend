import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
    fileName:{              // efficient way is too store actual file in cloud and connect metadata using mongoDB
        type:String,
        required:true,

    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const File = mongoose.model("File",fileSchema)