import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import {UserModel} from "../models/userModel"

require('dotenv').config()

module.exports = (passport) => {
    let options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    options.secretOrKey = process.env.JWT_SECRET_KEY

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        UserModel.findOne({_id: jwt_payload._id})
        .then(user => {
            done(null, user)
        }).catch(() => {
            return done(null, false)
        })
    }))
}