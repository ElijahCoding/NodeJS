const express = require('express')
const app = express()

const GoogleStrategy = require('passport-google-oauth20').Strategy

// passport.use(new GoogleStrategy({
//
// }))

const PORT = process.env.PORT || 3000
app.listen(PORT)
