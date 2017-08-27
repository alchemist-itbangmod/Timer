module.exports = () => {
  return {
    '/': { page: '/' },
    '/time/:slug': { page: './pages/routes/time' },
    '/time-admin/:slug': { page: './pages/routes/time-panel' },
  }
}