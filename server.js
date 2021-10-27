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

app.get('/style', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/styles.css'))
})

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName => studentName === name)

    if(index === -1 && name !== ''){
    students.push(name)
    rollbar.log("Student added successfully", {author: 'Jared', type: 'manual entry'})
    res.status(200).send(students)
    } else if(name === ''){
        rollbar.error('No name given')
        res.status(400).send('Must provide a string')
    } else {
        rollbar.critical('student already exists')
        res.status(400).send('Student already exists')
    }

})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400

app.listen(port, () => console.log(`Running on port ${port}`))