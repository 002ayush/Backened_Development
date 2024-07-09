import mongoose , {Schema,model} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String, //Taking url from cloudinary app
        required : true
    },
    coverImage : {
        type : String
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true,"Password is Required"]
    },
    refereshToken : {
        type : String

    }


},{timestamps : true}) // TimeStamps gives us two extra field "createdAt" and "updatedAt"

userSchema.pre("save",async function(next){
    if (!this.isModified('password')) return next();



    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect  = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.getAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.getRefereshToken = function(){
    return jwt.sign(
        {
            _id : this._id //The difference between the Access token secret and Referesh token secret is that the payload is small which we pass through it.
            
        },
        process.env.REFERESH_TOKEN_SECRET,
        {
            expiresIn : REFERESH_TOKEN_EXPIRY
        }
    )
}

export const User = model("User",userSchema)