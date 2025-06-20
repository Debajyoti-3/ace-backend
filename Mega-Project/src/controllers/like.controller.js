import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Like } from "../models/like.model.js"
import { Comment } from "../models/comment.model.js"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video

    const {userId} = req.user
    if( !isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid Video id")
    }

    // check whether any like already exits or not for the specific videoId and userId
    const existedLike = await Like.findOne({
        video: videoId,
        likedBy: userId
    })

    let message;

    // if existedLike presents means, already liked
    if(existedLike){
        //if already liked, delete like
        await existedLike.deleteOne()
        message="Liked is deleted"
    }
    else{
        // if not liked then do lik
       await Like.create({
            video:videoId,
            likedBy: userId
        })
        message="video liked"
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},message))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    const {userId} = req.user
    if( !isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid comment id")
    }
    const existedLike = await Comment.findOne({
        comment: commentId,
        likedby:userId
    })

    let message;

    if(existedLike){
        await existedLike.deleteOne()
        message="like deleted"
    }
    else{
        // if there is not liked the comment then like the comment (by creating)
        Like.create({
            comment: commentId,
            likedBy: userId
        })
        message="liked created"
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},message))

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet

    const {userId} = req.user
    if( !isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid tweet id")
    }

     const existedLike = await Tweet.findOne({
        comment: tweetId,
        likedby:userId
    })

    let message;

    if(existedLike){
        await existedLike.deleteOne()
        message="like deleted"
    }
    else{
        // if there is not liked the comment then like the comment (by creating)
        Tweet.create({
            tweet: tweetId,
            likedBy: userId
        })
        message="liked created"
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},message))
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

    const {username} = req.params

    const result = await User.aggregate([   // as we want User with their liked videos, so we do User.aggregate
        {
            $match:{        // filtering
                username:username?.toLowerCase()
            }
        },
        {
            $lookup:{
                from:"likes",   // foreign field
                localField:"_id",
                foreignField: "likedBy",
                as:"likedVideos"
            }
        },
        {
           $unwind:"$likedVideos"   // turn array into object
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,result,"user's liked videos fetched successfully"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
