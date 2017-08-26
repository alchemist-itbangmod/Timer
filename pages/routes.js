const routes = module.exports = require('next-routes')()

routes
  .add('room')
  .add('time', '/time/:slug')
  .add({ name: 'wow', pattern: '/wow', page: './routes/time' })