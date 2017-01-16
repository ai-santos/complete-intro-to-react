require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
const ReactRedux = require('react-redux')
const Provider = ReactRedux.Provider
const Store = require('./js/Store.jsx')
const store = Store.store
const _ = require('lodash')
const fs = require('fs')
const port = 5050
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const ClientApp = require('./js/ClientApp.jsx')
const Routes = ClientApp.Routes

const server = express()

server.use('/public', express.static('./public'))

server.use((request, response) => {
  match({ routes: Routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message)
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const body = ReactDOMServer.renderToString(
        React.createElement(Provider, {store}, 
          React.createElement(RouterContext, renderProps)
        )
      )
      response.status(200).send(template({ body }))
    } else {
      response.status(404).send('not found')
    }
  })
})

console.log('listening on port ' + port)
server.listen(port)
