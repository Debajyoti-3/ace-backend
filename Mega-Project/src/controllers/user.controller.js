import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResonse } from "../utils/ApiResonse.js";

const registerUser = asyncHandler( async (req,res)=>{
   
    // taking user details from frontend
    // validation - (atleast check not empty fields)
    // check if the user is already resistered or not(from username, email)
    // taking image, avater
    // upload them in cloudinary - check avatar
    // create database to store user data
    // remove password,refresh token
    //  check user creation
    // send res


    // taking user details
    const {fullName, email, username, password}= req.body
    console.log("email: ",email);


    // validation --- not empty

    // if(email == ""){
    //     throw new ApiError(400, "Something Went Wrong")
    // }
    if([fullName,email, username, password].some((field)=>{field?.trim()===""})){
        throw new ApiError(400, "All Field are Required")
    }


    // checking existed user or not
    const existedUser = User.findOne({
        $or: [{ username },{ email }]   // this is like OR operator
    })
    if(existedUser){
        throw new ApiError(409, "username or email is already existed")
    }

    const avatarLocalPath = req.file?.avatar[0].path
    const coverLocalPath = req.file?.coverImage[0].path

    if(!avatarLocalPath){
        throw new ApiError(409, "avatar is required")
    }

    // upload on cloudinary
    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage = uploadOnCloudinary(coverLocalPath)
    if(!avatar){
        throw new ApiError(409, "avatar is required")
    }

    // create store in database
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url,
        password,
        email,
        username : username.toLowerCase()
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"       // means it removes password, refreshToken (wierd syntax)
    )
    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong in the of Resister of the User")
    }


    // response
    res.status(201).json(
        new ApiResonse(200, createdUser ,"User Resistered Succesfully")
    )

    
})

export {registerUser}