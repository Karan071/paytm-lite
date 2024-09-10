const express = require("express")
const jwt = require("jsonwebtoken");
const JWT_TOKEN = require("./config");

const authMiddlware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.starts('Bearer')){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.sign(token,JWT_TOKEN);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(404).json({})
    }
};

module.exports = authMiddlware;