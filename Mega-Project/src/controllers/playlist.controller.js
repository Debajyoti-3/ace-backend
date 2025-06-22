import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist

    const {videoId} = req.params
    const {userId} = req.user
    
    if(isValidObjectId(videoId)){
        throw new ApiError(400,"videoId is not valid")
    }
    if(!name || !description){
        throw new ApiError(400,"required fields are not present: name or description")
    }

    const newPlaylist = await Playlist.create({
        name,
        description,
        owner:userId,
        video:videoId
    })

    return res
    .status(200)
    .json(new ApiResponse(200,newPlaylist,"New Playlist Created"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    // aggregation pipeline
    const result = await User.aggregate([
        {
            $match:{
                _id:userId
            }
        },
        {
            $lookup:{
                from:"playlists",
                localField:"_id",
                foreignField:"owner",
                as:"userPlaylists"
            }
        },
        {
            $unwind:"$userPlaylists"
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,result,"user's playlists fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"playlistId is not Valid")
    }

    const playlist = await Playlist.findById(playlistId)

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"playlist is fetched successfully by the ID"))

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!playlistId || !videoId){
        throw new ApiError(400,"Required fields are not found:: playlistId and videoId")
    }

    // check playlistId & videoId is Valid or not
    if(isValidObjectId(playlistId)){
        throw new ApiError(400,"playlistId is not Valid")
    }
    if(isValidObjectId(videoId)){
        throw new ApiError(400,"videoId is not valid")
    }


    // add video to playlist
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push:{     // pushes (using push operator) new video into the video array
                video:videoId
            }
        },
        {
            new:true    // return the updated document
        }
    )
    if(!updatePlaylist){
        throw new ApiError(400,"playlist not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedPlaylist,"video is added to the playlist"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if(!playlistId || !videoId){
        throw new ApiError(400,"Required fields are not found:: playlistId and videoId")
    }

    // check playlistId & videoId is Valid or not
    if(isValidObjectId(playlistId)){
        throw new ApiError(400,"playlistId is not Valid")
    }
    if(isValidObjectId(videoId)){
        throw new ApiError(400,"videoId is not valid")
    }


    // remove video from playlist
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pop:{     // pops out (using pop operator) the video from the video array
                video:videoId
            }
        },
        {
            new:true    // return the updated document
        }
    )
    if(!updatePlaylist){
        throw new ApiError(400,"playlist not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedPlaylist,"video is removed from the playlist"))

})

const deletePlaylist = asyncHandler(async (req, res) => {

    const {playlistId} = req.params
    // TODO: delete playlist

    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)
    
    if(!deletedPlaylist){
        throw new ApiError(400,"Playlist not Found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,deletedPlaylist,"Playlist is Deleted Successfully"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"playlistId is not Valid")
    }
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
                name,
                description,
            }
        },
        {
            new:true
        }
    )
    if(!updatedPlaylist){
        throw new ApiError(400,"Playlist not Found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedPlaylist,"Playlist is Updated Successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}