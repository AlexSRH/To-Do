require('dotenv/config')
require('./database')
const express = require('express')

const app = express()

app.use(express.json())

module.exports = app
