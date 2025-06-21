import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Comment } from "../models/comment.model.js"
import { Video } from "../models/video.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query    // here page, limit are generally in string

    const options = {       // convert page and limit into integers
        page:parseInt(page),
        limit:parseInt(limit)   // limit in a page
    }

    const aggregate = await Comment.aggregate([
        {
            $match:{
                video:videoId
            }
        },
        {
            $lookup:{       // takes all user details of a specific comment of a video
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"userDetails"
            }
        },
        {
            $unwind: "$userDetails"       // makes the result to object
        }
    ])

    // use mongooseAggregatePaginate
    const result = await Comment.aggregatePaginate(aggregate, options)

    return res
    .status(200)
    .json(new ApiResponse(200,result,"all comments to the video are fetched successfully"))

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

    const {content,videoId} = req.body
    const {userId} = req.userId     // as user must be authenticated so we will get access to req.user (from middleware)

    if(!content || !videoId){
        throw new ApiError(400,"required fileds are not present: content or videoId")
    }

    // optional: check video exists or not
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(400,"video is not found")
    }

    // create comment
    const result = await Comment.create({
        content,
        video:videoId,
        owner: userId
    })

    return res
    .status(200)
    .json(new ApiResponse(200,result ,"Comment generated/created successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment

    const {commentId} = req.params 

    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "commentId is not valid ")
    }
    const result = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set:{
                content: newContent,    // updated with new comment
            }
        },
        {
            new: true
        }

    )

    return res
    .status(200)
    .json(new ApiResponse(200,result,"comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const {commentId} = req.params
    const {userId} = req.user

    if(!commentId){
        throw new ApiError(400, "Comment Id Required")
    }
    // find the comment on the basis of commentId and Owner(userId) of the comment
    const comment = await Comment.findOne({
        comment:commentId,
        owner:userId
    })

    // Enhancement: only the owner of the comment will be able to delete the comment
    if(comment.owner.toString() !== userId.toString()){
        throw new ApiError(403,"User is unauthorized to Delete the comment")
    }
    await comment.deleteOne()

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Comment is Deleted"))

})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}