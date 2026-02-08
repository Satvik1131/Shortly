const jwt=require("jsonwebtoken");
const secret="satvik$123@&"
//const sessionIDToUserMap= new Map(); //no need of this now 

//this function makes token for me i.e token assignment for user
function setuser(user){
    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
            role:user.role,
        },
        secret
    );
}

function getuser(token){
    if(!token) return null;
    try{
         return jwt.verify(token,secret);
    }catch(err){
        return null;
    }
}

module.exports={
    setuser,
    getuser,
}