import express, { Application } from 'express'
import HealthCheckRoute from './routes/HealthCheck'
import ExportsRoute from './routes/Jobs'

// Boot express
export const app: Application = express()

/* Health-check */
app.use(HealthCheckRoute)

/* Routes */
app.use(ExportsRoute)
