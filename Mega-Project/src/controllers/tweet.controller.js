import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    const {content} = req.body;
    const {tweetId}= req.params
    const {userId} = req.user

    if(!content || !tweetId){
        throw new ApiError(400,"Required fields are not given")
    }

    if(!userId){
        throw new ApiError(400, "userId not found")
    }

    const addTweet = await Tweet.create({
        content:content,
        owner:userId
    })

    return res
    .status(200)
    .json(new ApiResponse(200,addTweet,"Tweet Created successfully"))
    
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    
    // const tweet = await Tweet.findById(req.params?._id)
    // if(!tweet){
    //     throw new ApiError(400,"tweet not found");
    // }
    const {userId} = req.user
    const result = await User.aggregate([
        {
            $match:{    // filtering
                _id:userId,
            }
        },
        {
            $lookup:{   // join
                from:"tweets",
                localField:"_id",
                foreignField:"owner",
                as:"userTweets"
            }
        },
        {
            $unwind: "$userTweets"
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse (200,result,"user's tweets  fetched successfully"))

})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet

    const tweet = await Tweet.findByIdAndUpdate(      // here need--> id, update, options(optioanl)
        req.params?._id,
        {
            $set:{
                content: newContent,
            }
        },
        {
            new:true,   // (optional)   --> it means return the updated document instead of origianl one
        }
    )
    return res
    .status(200)
    .json(new ApiResponse(200,tweet,"tweet updated successfully"))

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet

    // validate id (optional)
    if(! isValidObjectId(req.params?._id)){
        throw new ApiError(400,"tweet id is not valid")
    }

    const deletedTweet = await Tweet.findByIdAndDelete(req.params?._id)
    if(!deletedTweet){
        throw new ApiError(400,"tweet not deleted or tweet not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,deleteTweet,"Tweet Deleted Successfully"))

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}