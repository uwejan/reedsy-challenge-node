import { groupBy, clone } from 'lodash'
import uuid from 'uniqid'
import { string } from 'zod'
import {
  JobOperationsEnum,
  ProcessingTimeJobExportEnum,
  ProcessingTimeJobImportEnum,
  StoreItemExportSchemaType,
  StoreItemImportSchemaType,
  StoreItemSchemaStateFieldEnum,
} from '../types/JobOperations'

/*
 *
 *
 *
 * Improve DAO:
 *   Create Separate class for store property that implements Map<string, StoreItemExportSchemaType | StoreItemImportSchemaType>
 *  */
export class Store {
  private readonly store: Record<string, any>
  private readonly timerStore: Record<string, any>

  constructor() {
    /* The store where we keep all record => Simple but not great on low memory computer and huge records */
    this.store = {}
    /* Timer object to keep track of timers */
    this.timerStore = {}
  }

  /*
   * Forcing typeof processOperation to guarantee same tye and value while comparing
   *
   *  */
  static #initOperationTTL({
    operation,
    type,
  }: {
    type: string
    operation: JobOperationsEnum
  }): any {
    if (
      JobOperationsEnum[operation as keyof typeof string] ===
      JobOperationsEnum.exportJob
    ) {
      return ProcessingTimeJobExportEnum[type as keyof typeof string]
    }
    if (
      JobOperationsEnum[operation as keyof typeof string] ===
      JobOperationsEnum.importJob
    ) {
      return ProcessingTimeJobImportEnum[type as keyof typeof string]
    }
  }

  /* Popullating object values based on operation */
  protected static initOperationItemModel({
    bookId,
    url,
    operation,
    type,
  }: {
    bookId: string
    url: string
    operation: JobOperationsEnum
    type: string
  }): StoreItemExportSchemaType | StoreItemImportSchemaType {
    let item: StoreItemExportSchemaType | StoreItemImportSchemaType = {}
    if (
      JobOperationsEnum[operation as keyof typeof string] ===
      JobOperationsEnum.exportJob
    )
      item = {
        bookId: bookId,
        type: type,
        state: StoreItemSchemaStateFieldEnum.pending,
        created_at: Date.now().toString(),
        updated_at: null,
      }
    if (
      JobOperationsEnum[operation as keyof typeof string] ===
      JobOperationsEnum.importJob
    )
      item = {
        bookId: bookId,
        url: url,
        type: type,
        state: StoreItemSchemaStateFieldEnum.pending,
        created_at: Date.now().toString(),
        updated_at: null,
      }
    return item
  }

  /* Find-out Operation type => import/export  */
  protected static initOperationType({
    operation,
  }: {
    operation: JobOperationsEnum
  }): any {
    if (
      JobOperationsEnum[operation as keyof typeof string] ===
      JobOperationsEnum.exportJob!
    )
      return JobOperationsEnum.exportJob
    if (
      JobOperationsEnum[operation as keyof typeof string] ===
      JobOperationsEnum.importJob
    )
      return JobOperationsEnum.importJob!
  }

  /* Create timer to update item */
  protected createTTL({
    operationType,
    key,
    ttl,
  }: {
    key: string
    operationType: string
    ttl: number
  }): void {
    this.timerStore[key] = setTimeout((_) => {
      this.update(operationType, key)
      delete this.timerStore[key]
    }, ttl)
  }

  get(operationType: JobOperationsEnum): object {
    return groupBy(clone(this.store[operationType]), 'state')
  }

  /* Update item state. Notice [operationType][key] helps knowing where item is stored  */
  protected update(operationType: string, key: string): void {
    const itemToBeUpdated = this.store[operationType][key]
    /* set update_at */
    itemToBeUpdated.updated_at = Date.now().toString()
    /* set finished */
    itemToBeUpdated.state = StoreItemSchemaStateFieldEnum.finished
    this.store[operationType][key] = itemToBeUpdated
  }

  /* Save the item */
  save({
    bookId,
    url,
    operation,
    type,
  }: {
    bookId: string
    url: string
    operation: JobOperationsEnum
    type: string
  }): StoreItemExportSchemaType | StoreItemImportSchemaType {
    const ttl = Store.#initOperationTTL({ operation, type })
    const operationType = Store.initOperationType({ operation })
    const item = Store.initOperationItemModel({
      bookId: bookId,
      url: url,
      operation: operation,
      type: type,
    })
    const key = uuid()

    /*
     * Before storing the object we need to make sure parenting key exists otherwise we assign empty object
     *  */
    if (!this.store[operationType]) this.store[operationType] = {}
    this.store[operationType][key as keyof typeof string] = item

    if (ttl) {
      this.createTTL({
        operationType: operationType,
        key: key,
        ttl: ttl,
      })
    }
    return item
  }
}
