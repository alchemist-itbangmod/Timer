require('dotenv').config()
const express = require('express')
const next = require('next')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const server = express()

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const { parse } = require('url');

// const DEV = process.env.ENVIRONMENT !== 'PRODUCTION';
// const PORT = 3000;

// const app = next({ dir: '.', dev: DEV });
// const handle = app.getRequestHandler();

// const getRoutes = require('./routes');

// const routes = getRoutes();
// app.prepare().then(() => {
//   const server = express();
//   server.get('*', (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     const { pathname, query } = parsedUrl;
//     const route = routes[pathname];
//     if (route) {
//       return app.render(req, res, route.page, route.query);
//     }
//     return handle(req, res);
//   });

//   server.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`> Ready for liftoff: http://localhost:${PORT}`);
//   });
// });

// const app = server.listen(3001, (err) => {
//   if (err) throw err;
//   console.log('> Ready on http://localhost:3001')
// })

const io = require('socket.io').listen(3002)
console.log('ready')

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

  
  socket.on('auth', (data) => {
    console.log(data)
    switch (data.key) {
      // Room
      case '2HYPXQ':        
        socket.emit('auth', { room: 'time/train1' });
        break;
      case 'ZKTUFF':        
        socket.emit('auth', { room: 'time/train2' });
        break;
      case 'L7DWTW':        
        socket.emit('auth', { room: 'time/train3' });
        break;
      case 'C3GGEY':        
        socket.emit('auth', { room: 'time/train4' });
        break;
      case 'SXZZFD':        
        socket.emit('auth', { room: 'time/train5' });
        break;
      case 'DEMONM':        
        socket.emit('auth', { room: 'time/taehub' });
        break;
      case 'SHFCE2':        
        socket.emit('auth', { room: 'time-admin/train1' });
        break;
      case 'J3BWD9':        
        socket.emit('auth', { room: 'time-admin/train2' });
        break;
      case 'W87ZL2':        
        socket.emit('auth', { room: 'time-admin/train3' });
        break;
      case '8YPSZF':        
        socket.emit('auth', { room: 'time-admin/train4' });
        break;
      case 'FKLJSX':        
        socket.emit('auth', { room: 'time-admin/train5' });
        break;
      case 'DEMOAD':        
        socket.emit('auth', { room: 'time-admin/taehub' });
        break;
      default: 
        socket.emit('auth', { room: false });
        break;
    }
  })

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

  // train 5

  socket.on('train5', () => {
    console.log('train5')
  })

  socket.on('train5-admin', (val) => {
    console.log('on @ train5-admin')
    io.emit('train5', val)
  })

  // demo

  socket.on('taehub', () => {
    console.log('taehub room')
  })

  socket.on('taehub-admin', (val) => {
    console.log('on @ taehub')
    io.emit('taehub', val)
  })

})
