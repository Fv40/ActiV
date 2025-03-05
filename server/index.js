const PORT = 8090
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Server OK')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})