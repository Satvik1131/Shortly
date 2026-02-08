const {v4: uuidv4}=require('uuid');
const User=require("../models/user");
const{setuser}=require("../service/auth");

async function handleusersignup(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");   //redirects to homepage
}

async function handleuserlogin(req,res){
    const{name,email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user)
        return res.render("login",{
            error:"Invalid username or password",
        })
    //const sessionID=uuidv4(); 
    const token=setuser(user);
    // If user checked "Remember me" make cookie persistent for 30 days; otherwise leave it as a session cookie
    if (req.body.remember) {
        res.cookie("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    } else {
        res.cookie("token", token, { httpOnly: true });
    }
    // Redirect to dashboard after login
    return res.redirect("/dashboard");
}

module.exports={
    handleusersignup,
    handleuserlogin,
}

