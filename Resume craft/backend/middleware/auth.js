const { verifyJWT } = require("../utils/generatetokens");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please sign in.",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format.",
      });
    }
    const userData = verifyJWT(token);
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please sign in again.",
      });
    }
    req.user = userData.id || userData._id;
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Token verification failed.",
      error: error.message,
    });
  }
};

module.exports = verifyUser;
