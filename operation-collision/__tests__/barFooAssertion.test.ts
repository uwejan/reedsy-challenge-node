import { Operation } from '../src/libs/Operation'

const s = 'abcdefg'
const expected = 'aFOObcBARdefg'
const op1 = new Operation([{ skip: 1 }, { insert: 'FOO' }])
const op2 = new Operation([{ skip: 2 }, { insert: 'BAR' }])
const combined1 = Operation.combine(op1, op2)

test('combined op1, op2 to match aFOObcBARdefg', () => {
  expect(combined1.apply(s)).toEqual(expected)
})
