import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true         // index for efficient searching
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index:true
    },
    password:{
        type: String,       // String type is important here
        required:true

    },
    avatar:{
        type: String,        // cloudinary url
        required:true

    },
    coverImage:{
        type: String        // cloudinary url

    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ]

    
},{timestamps:true})

userSchema.pre("save", async function(next){    // dont use arrow func here (causes error)

    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)  // encrypting, 10 is saltRounds
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)    // compare password during login
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(        // bug fix -> initially i didn't retrun this part
    {
        _id: this._id,
        email:this.email,
        fullName: this.fullName,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(        // bug fix -> initially i didn't retrun this part
    {
        _id: this._id

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User", userSchema)