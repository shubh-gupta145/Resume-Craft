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
            message:"Users not exist",
            error:error.message
        })

    }

}
async function getUserbyID(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while fetching user"
        });
    }
}
async function updateUser(req, res) {
    const { id } = req.params;
    const {name,email,password}= req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const updatedUser=await User.findByIdAndUpdate(id,{name,email,password})

        return res.status(200).json({
            success: true,
            message: "User Updated successfully",
            updatedUser: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while updating user"
        });
    }
}
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const deletedUser= await User.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            deletedUser: {
                _id: deletedUser._id,
                name: deletedUser.name,
                email: deletedUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while deleting user"
        });
    }
}

module.exports={
    createUser,
    getUsers,
    getUserbyID,
    updateUser,
    deleteUser
}

