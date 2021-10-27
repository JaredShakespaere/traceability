const express = require('express')

const path = require('path')


const app = express()
app.use(express.json())

// const Rollbar = require('rollbar')

// let rollbar = new Rollbar({})

const port = process.env.PORT || 4400

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))

})

const port = process.env.PORT || 4400

app.listen(port, () => console.log(`Running on port ${port}`))