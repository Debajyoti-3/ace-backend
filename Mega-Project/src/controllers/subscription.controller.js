import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Subscription } from "../models/subscription.model.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription

    const {userId} = req.params
    if(!isValidObjectId(channelId)){
        throw new ApiError(400, "channelId is not valid")
    }

    const existedSubscription = await Subscription.findOne({
        channel: channelId,
        subscriber: userId
    })

    let message;
    if(existedSubscription){
        await existedSubscription.deleteOne()   // if already subscribed then delete the subscription
        message="subscription is removed successfully"
    }
    else{
        await Subscription.create({ // if not subscribed then add subscription
            channel: channelId,
            subscriber: userId
        })
        message="subscription added successfully"
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},message))
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if(! isValidObjectId(channelId)){
        throw new ApiError(400,"invalid channelId")
    }

    const result = await Subscription.aggregate([
        {
            $match:{
                channel:channelId
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"channel",
                foreignField:"_id",
                as:"subscribers"
            }
        },
        {
            $unwind:"subscribers"   // transfer array into object
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,result,"channel subscribers fetched successfully"))
})


// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    const {username} = req.user

    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"Invalid subscriberId")
    }

    const result = await User.aggregate([
        {
            $match:{
                username: username,
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribedTo"
            }
        },
        {
            $unwind:"$subscribedTo"  // transfer array into object
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,result, "subscribed channels fetched successfully"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}