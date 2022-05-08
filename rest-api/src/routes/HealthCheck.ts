import express, { Express, Request, Response, NextFunction } from 'express'

const server: Express = express()

/* Health-check */
server.get('/ping', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'PONG!' }))

export = server
