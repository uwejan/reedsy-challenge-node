import { Operation } from '../src/libs/Operation'

const s = 'abcdefg'
const op1 = new Operation([{ skip: 4 }, { insert: 'FOO' }])
const op2 = new Operation([{ skip: 4 }, { insert: 'BAR' }])
const combined1 = Operation.combine(op1, op2)
const combined2 = Operation.combine(op2, op1)
/*  Expected: "abcdFOOefgBAR"
 *   Received: "abcdBARefgFOO"
 * Does not work? I can not think why the instruction
 * in the code-challange assumed it should work
 * */
test('combined assertion', () => {
  expect(combined2.apply(s)).toEqual(combined1.apply(s))
})
