import mongoose, { isValidObjectId } from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { rawListeners } from "process"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    const result = await User.aggregate([
        {
            $lookup:{
                from:"videos",
                localField:"_id",
                foreignField:"owner",
                as:"Videos"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"Subscribers"
            }
        },
        {
            $unwind:{
                path: "$Videos",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"Videos._id",
                foreignField: "video",
                as: "VideoLikes"

            }
        },
        {
            $group:{
                _id: "$_id",
                totalVideos:{
                    $addToSet: "$Videos._id"    // attToSet means only stores unique in Array
                },
                totalViews:{
                    $sum:"$Viddeos.views"
                },
                totalLikes:{
                    $sum:{
                        $size:"$VideoLikes"
                    }
                },
                totalSubscribers:{
                    $first:{
                        $size: "$Subscribers"
                    }
                }
            },
        },
        {
            $project:{
                totalVideos: {
                    $size: "$totalVideos",
                },
                totalViews: 1,
                totalLikes: 1,
                totalSubscribers: 1
            }
        }
        
    ])

    if(!result){
        throw new ApiError(400,"channel stats not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,result,"Channel Stats Fetched Successfully"))
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const {channelId} = req.params
    const {userId} = req.user

    if(channelId && isValidObjectId(channelId)){
        throw new ApiError(400,"channel id is not valid")
    }
    const result = await Video.aggregate([
        {
            $match:{
                owner: new mongoose.Types.objecectId(channelId)     // as owner is type objectId
            }
        },
        
    ])

    if(!result || result.length == 0){
        throw new ApiError(400,"channel videos not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,result,"channel videos fetched successfully"))

})

export {
    getChannelStats, 
    getChannelVideos
}