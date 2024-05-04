const express = require('express');
const router =  express.Router();
const controller = require("../controller/postController");
const passport = require('passport')
router.post("/add_post",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.add_post);
router.get("/view_post",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.view_post);
router.delete("/delete_post/:id",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.delete_post);
router.put("/update_post/:id",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.update_post);
router.put("/update_post/:id",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.update_post);
router.get("/isactivedata/:id",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.isactivedata);
router.get("/isdactivedata/:id",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.isdactivedata);
router.get("/dashbord",passport.authenticate('jwt',{failureRedirect:"/faildlogin"}),controller.dashbord);


router.get("/faildlogin",async(req,res)=>{
    try {
        return res.status(400).json({mes:"login faild",status:0})
    } catch (error) {
        console.log("post time error",error);
        return res.status(400).json({mes :'post logi errr',status :0})
    }
})
module.exports= router;