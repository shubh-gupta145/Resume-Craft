const jwt= require("jsonwebtoken"); 
const secretKey="subratrohitharsh" ;
function generateJWT(payload) {
   let token=jwt.sign(payload,secretKey ,{expiresIn :"1h"});
   return token;
};
function verifyJWT(token) {
   try{
    let data= jwt.verify(token,secretKey )
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