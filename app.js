// initializing modules
require('dotenv').config()

const mustache = require('mustache')
const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT
app.listen(port, () => console.log('listening on port ' + port + " 🤖"))

// ---------------------------------------------------------
// Passport Configuration
// const session = require('express-session')
// const SESSION_SECRET = process.env.SESSION_SECRET
// app.use(session({secret: SESSION_SECRET}))
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

// pulling config environment settings from knexfile.js
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

// load templates
const homepageTemplate = fs.readFileSync('./templates/homepage.html', 'utf8')

app.get('/', (req, res) => {
    res.send(homepageTemplate)
})

// ---------------------------------------------------------
// Login success/error pages and serialization

// TODO: ADD TEMPLATES HERE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/success', (req, res) => res.send("You have successfully logged in"))
app.get('/error', (req, res) => res.send("Error logging in"))

// this is invoked on authorization and serializes the user instance 
// and stores it in the session via cookie
passport.serializeUser(function(user, cb) {
    cb(null, user.id)
})

// invoked every subsequent request to deserialize the instance, 
// providing it the unique cookie identifier as a credential
passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user)
    })
})

// ---------------------------------------------------------
// Passport Local Authentication

// const LocalStrategy = require('passport-local').Strategy

// passport.use(new LocalStrategy(
//     function(user, pw, done) {
//     //    REPLACE WITH KNEX SQL QUERIES
//         knex('Users').where({userEmail: user}), 
        
//             function(err, user) {
//                 if (err) {
//                     return done(err)
//                 }

//                 if (!user) {
//                     return done(null, false)
//                 }

//                 if (user.password != password) {
//                     return done(null, false)
//                 }

//                 return done(null, user)
//             }
//         )
//     }
// ))

app.post('/', 
    passport.authenticate('local', {failureRedirect: '/error'}),
    function(req, res) {
        res.redirect('/success?useremail='+req.user.userEmail)
    })

// ---------------------------------------------------------
// Facebook Login
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