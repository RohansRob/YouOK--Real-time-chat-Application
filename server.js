const express = require('express')
const app = express()
// Method call here ....
const http = require('http').createServer(app)

const PORT = process.env.PORT || 7000
//giving the port number
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
// Express middleware
// path here all static files
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket importing here
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    // socket connection
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})