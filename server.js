require('dotenv').config()
const express = require('express')
const next = require('next')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const server = express()

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {

//   server.get('/hello', (req, res) => {
//     return app.render(req, res, '/b', {
//       ...req.query,
//       subreddit: req.params.subreddit
//     })
//   })

//   server.get('*', (req, res) => {
//     handle(req, res)
//   })
//   server.listen(3000)
// })

const app = server.listen(3001, (err) => {
  if (err) throw err;
  console.log('> Ready on http://localhost:3001')
})

const io = require('socket.io').listen(3002)

io.on('connection', (socket) => {

  console.log('a user connected ' + socket.id);
  console.log('-----current user-----');
  console.log(socket.server.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log('-----current user-----');
    console.log(io.engine.clientsCount);
    console.log('user disconnected');
    io.emit('disconnectedPlayer', io.engine.clientsCount);
  });

  // train 1

  socket.on('train1', () => {
    console.log('on @ train1')
  })

  socket.on('train1-admin', (val) => {
    console.log('on @ train1-admin')
    io.emit('train1', val);
  })

  // train 2

  socket.on('train2', () => {
    console.log('on @ train2')
  })

  socket.on('train2-admin', (val) => {
    console.log('on @ train2-admin')
    io.emit('train2', val )
  })

  // train 3

  socket.on('train3', () => {
    console.log('train3')
  })

  socket.on('train3-admin', (val) => {
    console.log('on @ train3-admin')
    io.emit('train3', val)
  })

  // train 4

  socket.on('train4', () => {
    console.log('train4')
  })

  socket.on('train4-admin', (val) => {
    console.log('on @ train4-admin')
    io.emit('train4', val)
  })

})
