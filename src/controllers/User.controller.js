import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/Users_Videos/user.models.js";

import { upload_file_On_Cloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get details of the user from the frontend
  //validation of the form - to check all the field are not empty
  //Check user already exists already or not - through email or username
  //Check for avatar
  //upload them the image to cloudinary if it is available
  //Take the url as a reference from the cloudinary
  //whatever response is coming remove the fields password and referesh token
  //check for user creation
  // return response

  const { username, email, fullname, password } = req.body;
  console.log(email);

  //Check for validation of the fields it is empty or not
  if (
    [username, email, fullname, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(409, "All fields are Required!!");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User Already Exist in the Database");
  }

  //Adding and storing the image url in the cloudinary
  // console.log(req.files); Will check that soon
  const localPathAvatar = req.files?.avatar[0]?.path;
  const localPathCoverImage = req.files?.coverImage[0]?.path;
  if(!localPathAvatar){
    throw new ApiError(400,"Avatar files is required!!")
  }
  const avatarUploadedOnCloudinary = await upload_file_On_Cloudinary(localPathAvatar)
  const CoverImageUploadedOnCloudinary = await upload_file_On_Cloudinary(localPathCoverImage)
  if (!avatarUploadedOnCloudinary){
    throw new ApiError(500,"Internal Server Error occurred!!!")
  }

  const user = await User.create({
    fullname,
    avatar : avatarUploadedOnCloudinary.url,
    coverImage : CoverImageUploadedOnCloudinary?.url || "",
    email,
    password,
    username : username.toLowerCase()
  });

  //To check user is made in the database
  const createdUser = await User.findById(user._id).select(
    "-password -refereshToken"
  )
  if (!createdUser){
    throw new ApiError(500,"Something went wrong in adding to the database")
  }

  res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
  )

  /*res.status(200).json({
        message : "ok success!!",
        name : "One and only Ayush Mishra Route created by him!!!"
    }) */
});

export { registerUser };
