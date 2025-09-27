const User = require("../model/userSchema");

async function createUser(req,res) {
    try {
        const { name,email,password }=req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Please Enter the name",
            })
        }
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please Enter the email",
            })
        }
        if(!password){
            return res.status(400).json({
                success:false,
                message:"Please Enter the paasword",
            })
        }
        const newUser=await User.create({
            name,
            email,
            password
        })
        return res.status(200).json({
            success:true,
            message:"User Created Succesfully",
            newUser
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Please try again",
            error:error.message
        })
    }

}
async function getUsers(req,res) {
    try {
        const user=await User.find().select("-password");
        return res.status(200).json({
            success:true,
            message:"User Fetched Succesfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Please try again",
            error:error.message
        })

    }

}
module.exports={
    createUser,
    getUsers
}

