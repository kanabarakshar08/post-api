const express = require('express');
const port = 8050;
const app = express();
const path = require('path')

const db = require("./config/mongoose");
const mongoose = require('mongoose')
const joi = require('joi');


const passport = require('passport');
const passportJwt = require("./config/passpotr-jwt");
app.use(express.urlencoded())
const session = require('express-session')

app.use(session({
    name: "ak",
    secret: "akshar",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/admin",require("./router/admin"))

app.listen(port,(err)=>{
    if (err) {
        console.log("server is not runing");
    } else {
        console.log("server is runing in port..",port);
    }
})