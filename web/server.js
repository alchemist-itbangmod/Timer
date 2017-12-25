const express = require('express')
const next = require('next')
const cors = require('cors')

const server = express()

server.use(cors())

const io = require('socket.io').listen(3002)
console.log('ready')

io.on('connection', (socket) => {
  socket.on('setTime', ({ room, time }) => {
    io.emit(`${room}`, time)
  })
})
