// initializing modules
require('dotenv').config()

const mustache = require('mustache')
const fs = require('fs')
const express = require('express')
const passport = require('passport')

var app = express()

const port = process.env.PORT
app.listen(port, () => console.log('listening on port ' + port + " 🤖"))

// ---------------------------------------------------------
// Passport Configuration

app.use(passport.initialize())
app.use(passport.session())

// pulling config environment settings from knexfile.js
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

// load templates
const homepageTemplate = fs.readFileSync('./templates/homepage.html', 'utf8')
const loginTemplate = fs.readFileSync('./templates/login.html', 'utf8')

app.get('/', (req, res) => {
    res.send(homepageTemplate)
})

app.get('/login', (req, res) => {
    res.send(loginTemplate)
})

// ---------------------------------------------------------
// Facebook Login

// TODO: ADD TEMPLATES HERE
app.get('/success', (req, res) => res.send("You have successfully logged in"))
app.get('/error', (req, res) => res.send("Error logging in"))

// this is invoked on authorization and serializes the user instance 
// and stores it in the session via cookie
passport.serializeUser(function(user, cb) {
    cb(null, user)
})

// invoked every subsequent request to deserialize the instance, 
// providing it the unique cookie identifier as a credential
passport.deserializeUser(function(obj, cb) {
    cb(null, obj)
})

// ---------------------------------------------------------
// Facebook Auth Configuration

const FacebookStrategy = require('passport-facebook').Strategy

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET


passport.use(new FacebookStrategy ({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
))

app.get('/auth/facebook',
    passport.authenticate('facebook')
)

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
        failureRedirect: '/error'
    }), 
    function(req, res) {
        res.redirect('/success')
    }
)