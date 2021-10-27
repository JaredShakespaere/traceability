const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: 'b2a88862bcb34f52a1e6f17a5ddd950d',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('/api/students', (req, res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)
    rollbar.log("Student added successfully", {author: 'Jared', type: 'manual entry'})
    res.status(200).send(students)

})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400

app.listen(port, () => console.log(`Running on port ${port}`))