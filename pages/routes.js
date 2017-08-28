const routes = module.exports = require('next-routes')()

routes
  .add({ name: 'root', pattern: '/', page: './index.js' })
  .add({ name: 'time', pattern: '/time/:slug', page: './routes/time' })
  .add({ name: 'time-admin', pattern: '/time-admin/:slug', page: './routes/time-admin' })