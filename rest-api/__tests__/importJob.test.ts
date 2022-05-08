import axios from 'axios'

describe('Test Export Job Post Resource', () => {
  const data = {
    bookId: '1',
    type: 'pdf',
    url: 'https://arabi.blog',
  }
  it('Request /export should return', async () => {
    const resPost = await axios.post('http://localhost:3000/import', data)
    expect(resPost.status).toBe(200)
    expect(resPost.data.bookId).toBe('1')

    const restGet = await axios.get('http://localhost:3000/import')
    expect(restGet.status).toBe(200)

    expect(restGet.data.pending[0].bookId).toBe('1')
    expect(restGet.data.pending[0].state).toBe('pending')
  })

  jest.setTimeout(66000)
  it('should pause 60 sec and get matching result', async () => {
    await new Promise((r) => setTimeout(r, 60000))
    const restGetCheck = await axios.get('http://localhost:3000/import')
    expect(restGetCheck.status).toBe(200)

    expect(restGetCheck.data.finished[0].bookId).toBe('1')
    expect(restGetCheck.data.finished[0].state).toBe('finished')
  })
})
