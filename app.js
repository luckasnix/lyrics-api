const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const Schema = require('./schema/schema')

const app = express()

app.use(cors())

app.use('/', graphqlHTTP({
  schema: Schema,
  graphiql: true
}))

app.listen(4000)