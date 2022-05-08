import axios from 'axios'
describe('Test Ping Resource', () => {
  it('Request /ping should return Pong!', async () => {
    const result = await axios.get('http://localhost:3000/ping')
    expect(result.status).toBe(200)
    expect(result.data.message).toBe('PONG!')
  })
})
