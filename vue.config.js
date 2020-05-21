

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production/'
    : '/',
  devServer: {
    port: 8000,
    open: true
  }
}