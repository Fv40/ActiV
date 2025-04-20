const PORT = process.env.PORT || 8090
const express = require('express')
const userController = require('./controllers/userController')
require('dotenv').config()

const app = express()

// MIDDLEWARE
app.use(express.json()) // Use json from request body

// CORS 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Client files
app.use("/", express.static("dist"))

// Controller
app.use("/api/v1/users", userController)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})