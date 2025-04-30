const PORT = process.env.PORT || 8090
const express = require('express')
const userController = require('./controllers/userController')
const activityController = require("./controllers/activityController")
const friendgroupController = require("./controllers/friendgroupController")

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

// Controllers
app.use("/api/v1/users", userController)
app.use("/api/v1/activities", activityController)
app.use("/api/v1/friendgroups", friendgroupController)
app.use("/api/v1/meals", require("./controllers/mealController"))

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})