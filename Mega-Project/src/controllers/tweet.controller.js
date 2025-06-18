import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    const {content} = req.body;
    if(!content){
        throw new ApiError(400,"Tweet not Exist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,content,"Tweet Created successfully"))
    
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    
    const tweet = await Tweet.findById(req.params?._id)
    if(!tweet){
        throw new ApiError(400,"tweet not found");
    }

    return res
    .status(200)
    .json(new ApiResponse (200,tweet,"tweet fetched successfully"))

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