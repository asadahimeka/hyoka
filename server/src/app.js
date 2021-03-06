import 'isomorphic-fetch'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import cors from 'kcors'
import graphqlHttp from 'koa-graphql'
import graphqlBatchHttpWrapper from 'koa-graphql-batch'
import logger from 'koa-logger'
import Router from 'koa-router'
import { print } from 'graphql/language'

import { schema } from './schema'
import { jwtSecret } from './config'
import { getUser } from './auth'
import * as loaders from './loader'

import path from 'path'
import serve from 'koa-static'

const app = new Koa()
const router = new Router()

app.keys = jwtSecret

const graphqlSettingsPerReq = async (req) => {
  const { user } = await getUser(req.header.authorization)

  const dataloaders = Object.keys(loaders).reduce((dataloaders, loaderKey) => ({
    ...dataloaders,
    [loaderKey]: loaders[loaderKey].getLoader()
  }), {})

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      user,
      req,
      dataloaders
    },
    extensions: ({ document, variables, operationName, result }) => {
      console.log('document:', print(document))
      console.log('variables:', variables)
      console.log('result:', result)
    },
    formatError: (error) => {
      console.log(error.message)
      console.log(error.locations)
      console.log(error.stack)

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack
      }
    }
  }
}

const graphqlServer = convert(graphqlHttp(graphqlSettingsPerReq))

// graphql batch query route
// router.all('/graphql/batch', bodyParser(), graphqlBatchHttpWrapper(graphqlServer))

// graphql standard route
router.all('/graphql', graphqlServer)

app.use(logger())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
app.use(serve(path.join('public')))

export default app
