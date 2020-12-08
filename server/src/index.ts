import 'reflect-metadata'
import express from 'express'
import createServer from './createServer'
import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
import cookieParser from 'cookie-parser'

const { DB_PASSWORD, PORT, DB_USER, DB_ENDPOINT, DB_NAME } = process.env

const startSever = async () => {
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_ENDPOINT}/${DB_NAME}?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log('database connected')

  const app = express()

  app.use(cookieParser())

  app.get('/', (_, res) => {
    return res.json({ name: 'john' })
  })

  const server = await createServer()

  server.applyMiddleware({ app, cors: false })

  app.listen({ port: PORT || 5000 }, () => console.log(`Server is ready at http://localhost:${PORT || 5000}${server.graphqlPath}`))
}

startSever()
