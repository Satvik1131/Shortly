const{getuser}=require("../service/auth");

function checkforauthentication(req,res,next){
    const tokencookie=req.cookies?.token;
    req.user=null;
    res.locals.user = null;
    if(!tokencookie) return next();

    const token=tokencookie;
    const user=getuser(token);

    req.user=user;
    res.locals.user = user;
    return next();
} 

function restrictto(roles=[]){
    return function(req,res,next){
        if(!req.user || !roles.includes(req.user.role)) return res.redirect("/login");
        
        if(!roles.includes(req.user.role)) return res.end("Unauthorized Access");

        return next();
    };
}

module.exports={
    checkforauthentication,
    restrictto,
}