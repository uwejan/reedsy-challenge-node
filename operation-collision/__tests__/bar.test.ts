import { Operation } from '../src/libs/Operation'

const s = 'abcdefg'
const expected = 'abcBARdefg'
const op2 = new Operation([{ skip: 3 }, { insert: 'BAR' }])

test('inserts BAR skipping 2', () => {
  expect(op2.apply(s)).toEqual(expected)
})
