import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { JobImportBodyTypeFieldEnum } from '../types/JobOperations'

export const importJobValidator = {
  schema: z.object({
    // In this example we will only validate the request body.
    body: z.object({
      // bookId should be valid and non-empty string
      bookId: z.string().nonempty('bookId is required'),
      // type should be "word" | "pdf" | "wattpad" | "evernote"
      type: z.nativeEnum(JobImportBodyTypeFieldEnum),
      // url should be valid and non-empty string
      url: z.string().nonempty('url is required'),
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
