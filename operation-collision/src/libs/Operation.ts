type OptionType = {
  skip?: number
  insert?: string
  delete?: string
}
interface OptionInterface {
  options: OptionType[]
}

type OneOption = [OptionType]
/* String.prototype.splice = function (index, del, ...newStrs) {
  let str = this.split('')
  str.splice(index, del, newStrs.join('') || '')
  return str.join('')
} */
class OperationClass implements OptionInterface {
  readonly options: OptionType[] = []
  private arrOptions: any = []
  private isCombined?: boolean
  //  private skip?: number = null
  //  private insert?: string = null
  //  private delete?: string = null

  constructor(options: OptionType[]) {
    this.options = options
    //console.log(OperationClass.toObject(options))
    /* for (const ob of options) {
      console.log(ob)
    } */
  }

  protected setArrOpt(arr: any, arr1: any): void {
    this.arrOptions.push(
      OperationClass.parseOpt([...arr]),
      OperationClass.parseOpt([...arr1])
    )
    console.log(this.arrOptions.length)
  }

  private static parseOpt(arr: OptionType[]): OptionType {
    return arr.reduce((a, v) => ({ ...a, ...v }), {})
  }

  private static addStr(
    str: string,
    index: number,
    stringToAdd: string
  ): string {
    console.log(str, index, stringToAdd)
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    )
  }

  private addStrCombined = (str: string): string => {
    const skip2Computed = this.arrOptions[0].skip + 1 + this.arrOptions[1].skip
    const arrStr = str.split('')
    arrStr.splice(this.arrOptions[0].skip, 0, this.arrOptions[0].insert)
    arrStr.splice(skip2Computed, 0, this.arrOptions[1].insert)
    return arrStr.join('')
  }

  apply(str: string) {
    let result: string = ''
    if (this.isCombined) {
      result = this.addStrCombined(str)
    } else {
      const op = OperationClass.parseOpt(this.options)
      result = OperationClass.addStr(str, op.skip!, op.insert!)
    }
    return result
  }

  protected setCombined(): void {
    this.isCombined = true
  }
}

export class Operation extends OperationClass {
  static combine(option1: Operation, option2: Operation): Operation {
    const opClass = new Operation([...option1.options, ...option2.options])
    /* Calling combined after defining the new class
     * so we do not set combine on the other classes
     *  *  */
    opClass.setArrOpt(option1.options, option2.options)
    opClass.setCombined()
    return opClass
  }
}
