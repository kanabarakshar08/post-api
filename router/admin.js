const express = require('express');
const router =  express.Router();
const controller = require("../controller/admincontroller");
router.post("/register",controller.register);
router.get("/login",controller.login);

router.use("/post",require("./post"))
module.exports= router;