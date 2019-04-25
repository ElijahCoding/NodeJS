const express = require('express')
const app = express()
const keys = require('./config/keys')

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken) => {
        console.log(accessToken);
    })
)

app.get('/auth/google')

const PORT = process.env.PORT || 3000
app.listen(PORT)
