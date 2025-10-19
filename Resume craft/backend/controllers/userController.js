const bcrypt= require("bcryptjs");
const User = require("../model/userSchema");
const { generateJWT } = require("../utils/generatetokens");
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password) are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateJWT({
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
      error: error.message,
    });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }
    const token = generateJWT({
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token, 
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
      error: error.message,
    });
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
    login,
    getUsers,
    getUserbyID,
    updateUser,
    deleteUser
}

