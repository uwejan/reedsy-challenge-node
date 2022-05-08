import axios from 'axios'
const responseBody = {
  bookId: '2',
  type: 'epub',
  state: 'pending',
}
describe('Test Export Job ', () => {
  var requestBody = {
    bookId: '2',
    type: 'epub',
  }
  it('Request /export ', async () => {
    const resPost = await axios.post(
      'http://localhost:3000/export',
      requestBody
    )
    expect(resPost.status).toBe(200)
    expect(resPost.data.bookId).toBe('2')

    const restGet = await axios.get('http://localhost:3000/export')
    expect(restGet.status).toBe(200)

    expect(restGet.data.pending[0].bookId).toBe('2')
    expect(restGet.data.pending[0].state).toBe('pending')
  })

  jest.setTimeout(60000)
  it('should pause 10 sec and get matching result', async () => {
    await new Promise((r) => setTimeout(r, 10000))
    const restGetCheck = await axios.get('http://localhost:3000/export')
    expect(restGetCheck.status).toBe(200)

    expect(restGetCheck.data.finished[0].bookId).toBe('2')
    expect(restGetCheck.data.finished[0].state).toBe('finished')
  })
})
