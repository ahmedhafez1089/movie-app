const request = require('supertest')
const app = require('../app')

const movieID = 2000

test('Should get movie', async () => {
    const response = await request(app)
        .get(`/movie/${movieID}`)
        .send()
        .expect(200)
    
    expect(response.body.id).toEqual(movieID)
})

test('Should not get movie', async() => {
    const response = await request(app)
        .get('/movie/id')
        .send()
        .expect(404)

    expect(response.body.status_code).toEqual(34)    
})

test('Should get credits of movie', async () => {
    const response = await request(app)
        .get(`/movie/${movieID}/credits`)
        .send()
        .expect(200)

    expect(response.body.id).toEqual(movieID)    
})

test('Should not get credits of movie', async () => {
    const response = await request(app)
    .get(`/movie/id/credits`)
    .send()
    .expect(404)

    expect(response.body.status_code).toEqual(34)
})
