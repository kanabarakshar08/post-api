const passport = require('passport');
const jwtstrajy = require('passport-jwt').Strategy;
const jwtextr = require('passport-jwt').ExtractJwt;
const admin = require("../model/admin")
var option = {
    jwtFromRequest:jwtextr.fromAuthHeaderAsBearerToken(),
    secretOrKey :'akshar'
}
passport.use(new jwtstrajy(option,async(record,done)=>{
    let checkAdmin = await admin.findById(record.Admindata._id);
    if (checkAdmin) {
        return done(null, checkAdmin);
    }
    else {
        return done(null, false);
    }

}));
passport.serializeUser((user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    let rechekuser= await admin.findById(id);
    if (rechekuser) {
        return done(null,rechekuser)
    } else {
     return done(null,false)   
    }
})

module.exports = passport;