//work related to user like signup etc.
const express=require("express");
const {handleusersignup,handleuserlogin}=require("../controllers/user");
const router=express.Router();

router.post("/",handleusersignup);
router.post("/login",handleuserlogin);

// simple logout - clears token cookie
router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.redirect("/");
});

module.exports=router;

