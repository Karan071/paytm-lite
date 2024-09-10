const express = require("express")
const zod = require("zod");
const { User } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_TOKEN = require("../config");

//signin-schema
const zodSignupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
});
//signin
router.post("/signup", async (req,res) => {
    const body = req.body;
    const {success} = zodSignupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message : "Email is already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username
    })
    if(existingUser){
        return res.json({
           message : "Email is already taken / Incorrect inputs"
        })
    }

    //create a user in db
    const user = await User.create({
        username : body.username,
        password : body.password,
        firstName : body.firstName,
        lastName : body.lastName,
    })

    //mongi generated id
    const userId  = user._id;

    //jwt token create
    const token = jwt.sign({
        userId
    }, JWT_TOKEN);

    //user is create sucessfully
    res.json({
        message : "User created successfully",
        token : token
    })
});

//signup-schema
const signinBodySchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})
//signup
router.post("/signin", async(req,res) => {
    const body = req.body;
    const {success} = signinBodySchema.safeParse(body);
    if(!success){
        res.json({
            message : "Incorrect inputs",
        })
    }

    const user = await User.findOne({
        username : body.username,
        password : body.password
    })

    if(user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_TOKEN)
        
        res.json({
            token : token
        })
        return;
    }

    res.json({
        message : "Error while loggging in",
    })

})


module.exports = router;