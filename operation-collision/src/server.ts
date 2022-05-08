import { Operation } from './libs/Operation'

const s = 'abcdefg'
const op1 = new Operation([{ skip: 1 }, { insert: 'FOO' }])
const op2 = new Operation([{ skip: 3 }, { insert: 'BAR' }])
console.log(op1.apply(s)) // => "aFOObcdefg"
console.log(op2.apply(s)) // => "abcBARdefg"
//op2.apply(s) // => "abcBARdefg"
// [1] content [ { skip: 1 }, { insert: 'FOO' }, { skip: 3 }, { insert: 'BAR' } ]

const combined1 = Operation.combine(op1, op2) // => [{ skip: 1 }, { insert: 'FOO' }, { skip: 2}, { insert: 'BAR' } ]
console.log(combined1.apply(s)) // => "aFOObcBARdefg"
const combined2 = Operation.combine(op2, op1)

console.log(combined2.apply(s))

const addStrCombined = (
  str: string,
  skip1: number,
  insert1: string,
  skip2: number,
  insert2: string
): string => {
  const skip2Computed = skip1 + 1 + skip2
  const arrStr = str.split('')
  arrStr.splice(skip1, 0, insert1)
  arrStr.splice(skip2Computed, 0, insert2)
  return arrStr.join('')
}
