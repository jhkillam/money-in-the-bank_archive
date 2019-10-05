const express = require('express')
var app = express()
const port = 3000
app.listen(3000, () => console.log('listening on port ' + port))

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

