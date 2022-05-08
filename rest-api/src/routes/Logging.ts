import express, { Express, Request, Response, NextFunction } from 'express'
import Logging from '../libs/Logging'

const server: Express = express()

/* Log the request */
server.use((req: Request, res: Response, next: NextFunction) => {
  /* Log the req */
  Logging.info(`In-coming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  res.on('finish', () => {
    /* Log the res */
    Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`)
  })

  next()
})

export = server
