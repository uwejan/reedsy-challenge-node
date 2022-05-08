import express, { Express, Request, Response } from 'express'
import { exportJobValidator } from '../middlewares/ExportJobValidator'
import { StoreItem } from '../models/StoreItem'
import { importJobValidator } from '../middlewares/ImportJobValidator'
import { JobOperationsEnum } from '../types/JobOperations'
const server: Express = express()

const item = new StoreItem()

/* JobOperationExport   START */
/* POST */
server.post(
  '/export',
  exportJobValidator.validate(exportJobValidator.schema),
  (req: Request, res: Response) => {
    const result = item.save({
      ...req.body,
      operation: JobOperationsEnum.exportJob,
    })
    return res.send(result)
  }
)

/* GET */
server.get('/export', (req: Request, res: Response) => {
  return res.send(item.get(JobOperationsEnum.exportJob))
})
/* JobOperationExport   END */

/* JobOperationImport   START */
/* POST */
server.post(
  '/import',
  importJobValidator.validate(importJobValidator.schema),
  (req: Request, res: Response) => {
    return res.send(
      item.save({
        ...req.body,
        operation: JobOperationsEnum.importJob,
      })
    )
  }
)
/* GEt */
server.get('/import', (req: Request, res: Response) => {
  return res.send(item.get(JobOperationsEnum.importJob))
})
/* JobOperationExport   END */

export = server
