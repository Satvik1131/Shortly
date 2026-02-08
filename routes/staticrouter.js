const express=require('express');
const router=express.Router();
const URL = require("../models/url");
const { restrictto } = require('../middlewares/auth');

router.get('/admin/urls',restrictto(['ADMIN']),async (req,res)=>{
    const allurls= await URL.find({});
    // compute site-wide stats
    const totalUrls = allurls.length;
    const totalClicks = allurls.reduce((s,u) => s + (u.visitHistory ? u.visitHistory.length : 0), 0);
    const top = allurls.reduce((best, u) => {
        const clicks = (u.visitHistory||[]).length;
        if (!best || clicks > best.clicks) return { shortID: u.shortID, clicks, redirectURL: u.redirectURL };
        return best;
    }, null);

    return res.render("home",{
        urls:allurls,
        stats: { totalUrls, totalClicks, top }
    });
});

// Root always shows public landing page
router.get("/", async (req,res)=>{
    return res.render("index");
});

// Dashboard shows user urls and requires authentication
router.get("/dashboard", restrictto(["NORMAL","ADMIN"]), async (req,res)=>{
    const allurls= await URL.find({createdBy:req.user._id});    //restrict the gennerated url to the logged in user only
    // compute user stats
    const totalUrls = allurls.length;
    const totalClicks = allurls.reduce((s,u) => s + (u.visitHistory ? u.visitHistory.length : 0), 0);
    const top = allurls.reduce((best, u) => {
        const clicks = (u.visitHistory||[]).length;
        if (!best || clicks > best.clicks) return { shortID: u.shortID, clicks, redirectURL: u.redirectURL };
        return best;
    }, null);

    return res.render("home",{
        urls:allurls,
        stats: { totalUrls, totalClicks, top }
    });
});

//for authentication routes
router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.get("/login",(req,res)=>{
    return res.render("login");
});

module.exports=router;