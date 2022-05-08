const s = "abcdefg";
const foo = "FOO"
const bar = "BAR"

const result = s.split('').splice(1,0,foo).join('')
console.log(result)