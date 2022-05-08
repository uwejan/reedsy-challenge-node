import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { JobExportBodyTypeFieldEnum } from '../types/JobOperations'

export const exportJobValidator = {
  schema: z.object({
    // In this example we will only validate the request body.
    body: z.object({
      // bookId should be valid and non-empty string
      bookId: z.string().nonempty('bookId is required'),
      // type should be "epub" | "pdf"
      type: z.nativeEnum(JobExportBodyTypeFieldEnum),
    }),
  }),

  validate:
    (schema: any) => (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
        })
        next()
      } catch (err) {
        return res.status(400).send((err as Error).message)
      }
    },
}
