const routes = module.exports = require('next-routes')()

routes
  .add({ name: 'room', pattern: '/room', page: './routes/room' })
  .add({ name: 'time', pattern: '/time', page: './routes/time' })
  // .add('time', '/time/:slug')