import express, { Express, Request, Response, NextFunction } from 'express'
import Logging from '../libs/Logging'

const server: Express = express()

/* Error handling */
server.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found')

  Logging.error(error)

  res.status(404).json({
    message: error.message,
  })
})

export = server
