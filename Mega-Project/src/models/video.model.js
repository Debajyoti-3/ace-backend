import mongoose from "mongoose";
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'  // use this name instead of below name
// import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new mongoose.Schema({
    videoFiles:{
        type:String,        // from cloudinary
        required: true
    },
    thumbnail:{
        type: String,        // from cloudinary
        required: true
    },
    title:{
        type:String,
        required:true

    },
    views:{
        type:Number
    },
    duration:{
        type:Number         // from cloudinary

    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    description:{
        type:String,
        required: true
    }
},{
    timestamps:true
})

videoSchema.plugin(aggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)