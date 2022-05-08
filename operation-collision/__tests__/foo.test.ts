import { Operation } from '../src/libs/Operation'

const s = 'abcdefg'
const expected = 'aFOObcdefg'
const op1 = new Operation([{ skip: 1 }, { insert: 'FOO' }])

test('inserts FOO skipping 1', () => {
  expect(op1.apply(s)).toEqual(expected)
})
