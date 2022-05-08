import express, { Express } from 'express'
import LoggerRoute from './routes/Logging'
import HealthCheckRoute from './routes/HealthCheck'
import ErrorHandlingRoute from './routes/ErrorHandling'
import ExportsRoute from './routes/Jobs'
import { config } from './config'
import Logging from './libs/Logging'

const server: Express = express()
server.use(express.json())
const PORT = config.server.port

/* Start Server
 * GET `/export`
 * POST `/export`
 * GET `/import`
 * POST `/import`
 * GET `/ping`
 *  */
const StartServer = () => {
  /* Log all request and response -> METHOD, URL, IP, STATUS */
  server.use(LoggerRoute)

  /* Routes */
  server.use(ExportsRoute)

  /* Health-check */
  server.use(HealthCheckRoute)

  /* Error handling */
  server.use(ErrorHandlingRoute)

  server.listen(PORT, () => Logging.info(`Server is running on port ${PORT}`))
}

StartServer()
