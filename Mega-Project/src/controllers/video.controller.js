import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy='createdAt', sortType='desc', userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    if(!isValidObjectId(userId)){
        throw new ApiError(400,"userId is not Valid")
    }

    const matchStage={};

    if(userId){
        matchStage.owner = userId;
    }

    if(query){  // return videos where either the title OR the description matches the query
        matchStage.$or = [  
            {
                title:{
                    $regex:query,       // $regex operator allows you to search string fields using regular expression
                    $options: "i"       // i -> case-insensitive (means differents casing in the query will treated as same), Ex- matches Vlog, vlog, VLOG, vloG etc.
                }
            },
            {
                description:{
                    $regex: query,
                    $options: "i"
                }
            }
        ];
    }

    const sortStage = {};
    sortStage[sortBy] = sortType === 'asc' ? 1 : -1;    // here sortBy is dynamic Key not literal key, thats why we write sortStage[sortType] instead of sortStage.sortType

    const allVideos = await Video.aggregate([
        {
            $match:matchStage   // matching
        },
        {
            $sort: sortStage    // sorting
        },
        {
            $unwind:"$userVideos"   // makes Array into Object
        }
    ]);

    const options = {
        page:  parseInt(page),
        limit: parseInt(limit)
    };

    const result = await Video.aggregatePaginate(allVideos, options)

    return res
    .status(200)
    .json(new ApiResponse(200,result,"all videos are fetched successfully"))
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    const {thumbnailLocalPath, videoFilesLocalPath} = req.files
    const {userId} = req.user

    if(!thumbnailLocalPath || !videoFilesLocalPath){
        throw new ApiError(400,"Required Local Paths are not Provided")
    }
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    const videoFiles =  await uploadOnCloudinary(videoFilesLocalPath)

    if(!thumbnail){
        throw new ApiError(400, "Failed to upload thumbanil to clodinary")
    }
    if(!videoFiles){
        throw new ApiError(400,"failed to upload videoFiles to cloudinary")
    }

    const video = await Video.create({
        title,
        description,
        videoFiles:videoFiles.url,
        thumbnail:thumbnail.url,
        owner:userId,
        isPublished:true
    }).select("-views -duration")

    if(!video){
        throw new ApiError(400,"video is not Created")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},"video is published successfully"))

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    if(!videoId){
        throw new ApiError(400,"videoId is Empty or some ERROR")
    }
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"videoId is not Valid")
    }

    // get video by id
    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(400,"video not found")
    }
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    const {thumbnailLocalPath} = req.files
    const {title, description} = req.body

     if(!thumbnailLocalPath ){
        throw new ApiError(400,"thumbnail Local Paths are not Provided")
    }
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    
    const updatedVideo = await Video.findByIdAndUpdate(
        {
            $set:{
                title,
                description,
                thumbnail:thumbnail.url
            }
        },
        {
            new:true
        }
    )

    if(!updatedVideo){
        throw new ApiError(400,"video not updated")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedVideo,"video is updated"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"videoId is not valid")
    }

    await Video.findByIdAndUpdate(  // makes publish status false
            videoId,
            {
                $set:{
                    isPublished:false
                }
            },
            {
                new:true
            }
        )

    const deletedVideo = await Video.findByIdAndDelete(videoId)
    if(!deletedVideo){
        throw new ApiError(400,"video not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},"video is deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"video not found")
    }

/*    if(video.isPublished === true){
        await Video.findByIdAndUpdate(
            videoId,
            {
                $set:{
                    isPublished:false
                }
            },
            {
                new:true
            }
        )
    }
    else{
        await Video.findByIdAndUpdate(
            videoId,
            {
                $set:{
                    isPublished:true
                }
            },
            {
                new:true
            }
        )
    }
*/  
    // by avoiding duplicate code (in the upper case)
    const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            {
                $set:{
                    isPublished: !video.isPublished // toggles the publish status
                }
            },
            {
                new:true
            }
        )

    return res
    .status(200)
    .json(new ApiResponse(200,updatedVideo,"publish status is toggled successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}