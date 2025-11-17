const jwt= require("jsonwebtoken"); 
const JWT_SECRET = process.env.JWT_SECRET;
function generateJWT(payload) {
   let token=jwt.sign(payload,JWT_SECRET ,{expiresIn :"6h"});
   return token;
};
function verifyJWT(token) {
   try{
    let data= jwt.verify(token,JWT_SECRET )
    return data
   }catch(err){
    return false;
   }
} 
function decodeJWT(token) {
    let decoded =jwt.decode(token);
    return decoded;
}
module.exports={
    generateJWT,
    verifyJWT,
    decodeJWT
}