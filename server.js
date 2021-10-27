const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: 'b2a88862bcb34f52a1e6f17a5ddd950d',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
// app.use(express.json())


// app.get('/', (req, res) => {
//     try {
//         nonExistentFunction();
//     } catch (error) {
//         console.error(error);
//     }
// })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
    rollbar.info('html file served successfully')
})

const port = process.env.PORT || 4400

app.listen(port, () => console.log(`Running on port ${port}`))