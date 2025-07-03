import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role, defaultImageUrl } = req.body;

    if (!fullname || !email || !phoneNumber || !role || !password) {
      return res.status(400).json({
        message: "Please enter all details",
        success: false,
      });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists!",
        success: false,
      });
    }

    let profilePhotoUrl = defaultImageUrl || ""; // default to "" if not even defaultImageUrl

    // If file uploaded, upload to Cloudinary
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashPassword = await bcrypt.hash(password, 6);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};



export const login =async(req,res)=>{
    try {
        const{email,password,role} = req.body;
         if(!email|| !password|| !role){
            return res.status(400).json({
                message: "Please enter all details",
                success: false,
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success : false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Please enter a valid password!",
                success: false,
            })
        };

        // check role correction
        if(role!=user.role){
            return res.status(400).json({
                message: "account does not exist with this role!",
                success:false
            })
        };
        
        const tokenData = {
            userId:user._id,
        }
        const token  = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile,
            phoneNumber:user.phoneNumber,
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly: true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","0",{maxAge:0}).json({
            message: "Logged out successfully!",
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;// imddleware

        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
        //resume
         if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

         user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile,
            phoneNumber:user.phoneNumber,
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}