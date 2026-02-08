const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShorterURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    const shortID = shortid();

    await URL.create({
        shortID: shortID,         
        redirectURL: body.url,
        visitHistory: [], 
        createdBy: req.user ? req.user._id : null,         
    });

    // If the user is logged in, redirect to dashboard so stats and lists refresh
    if (req.user) {
        return res.redirect('/dashboard');
    }

    return res.render("home",{  //for showing  html page with ejs not json data
        id:shortID,
    });
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortID;

    const result = await URL.findOne({ shortID });

    if (!result) {
        return res.status(404).json({ error: "URL not found" });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

// Render a page that lists visits for a short URL (human-friendly list view)
async function handleRenderAnalyticsView(req, res) {
    const shortID = req.params.shortID;

    const result = await URL.findOne({ shortID });

    if (!result) {
        // render dashboard with an error message if not found
        return res.status(404).render('home', { error: 'URL not found', user: req.user });
    }

    return res.render('analytics', {
        shortID,
        analytics: result.visitHistory || [],
        totalClicks: result.visitHistory ? result.visitHistory.length : 0,
        user: req.user
    });
}

module.exports = {
    handleGenerateNewShorterURL,
    handleGetAnalytics,
    handleRenderAnalyticsView,
};
