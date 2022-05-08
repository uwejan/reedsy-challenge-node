export enum JobImportBodyTypeFieldEnum {
  'word' = 'word',
  'pdf' = 'pdf',
  'wattpad' = 'wattpad',
  'evernote' = 'evernote',
}
export enum JobExportBodyTypeFieldEnum {
  'epub' = 'epub',
  'pdf' = 'pdf',
}

export type JobImportSchemaType = {
  bookId: string
  type: 'word' | 'pdf' | 'wattpad' | 'evernote'
  url: string
}

export type JobExportSchemaType = {
  bookId: 'string'
  type: 'epub' | 'pdf'
}

export type StoreItemExportSchemaType = {
  bookId?: string
  type?: string | null
  created_at?: string
  updated_at?: string | null
  state?: 'pending' | 'finished'
}
export type StoreItemImportSchemaType = {
  bookId?: string
  type?: string | null
  url?: string | null
  created_at?: string
  updated_at?: string | null
  state?: 'pending' | 'finished'
}

export enum StoreItemSchemaStateFieldEnum {
  pending = 'pending',
  finished = 'finished',
}

export enum ProcessingTimeJobExportEnum {
  'epub' = 10000,
  'pdf' = 25000,
}
export enum ProcessingTimeJobImportEnum {
  'word' = 60000,
  'pdf' = 60000,
  'wattpad' = 60000,
  'evernote' = 60000,
}

export enum JobOperationsEnum {
  exportJob = 'exportJob',
  importJob = 'importJob',
}

export interface ObjectMap {
  [key: string]: StoreItemExportSchemaType | StoreItemImportSchemaType
}
