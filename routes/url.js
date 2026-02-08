const express=require("express");
const{handleGenerateNewShorterURL,handleGetAnalytics,handleRenderAnalyticsView}=require("../controllers/url");

const router=express.Router();  //important line because in production world we need router()

router.post("/",handleGenerateNewShorterURL);
router.get('/analytics/:shortID',handleGetAnalytics)
// Human-friendly analytics page (lists) for a specific short URL
router.get('/:shortID/analytics/view', handleRenderAnalyticsView);

module.exports=router;