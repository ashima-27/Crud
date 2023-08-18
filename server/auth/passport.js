// const passport = require("passport");
// const passportJwt = require("passport-jwt");
// const ExtractJwt = passportJwt.ExtractJwt;
// const StrategyJwt = passportJwt.Strategy;
// const User = require("../models/signup");
// passport.use(new StrategyJwt({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken, secretOrKey: process.env.JWT_SECRET, },
// function (jwtPayload, done)  {
//     return User.findOne({ where: { id: jwtPayload.id } }).then((signup) => {
//         return done(null, signup);
//     })
//     .catch((err) => {
//         return done(err);
//     })
// }));