const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')

const user = {
  id: 16,
  email: 'admin@mail.com',
  role: 'admin'
}

const token = generateToken(user)

const Category = {
  "name": "Fashion"
}

const CategoryEmpty = {
  "name": ""
}

const CategoryNull = {
  "name": null
}

describe('POST /categories', function () {
  describe('category successfully created', () => {
    test('add category succeed', function(done) {
      request(app)
        .post('/categories')
        .set('access_token', token)
        .send(Category)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('category')
          expect(body.category).toHaveProperty('name', Category.name)
          done()
        })
        .catch(done)
    })
  })

  describe('category failed created', () => {
    test('add category failed because there is no token', function(done) {
      request(app)
        .post('/categories')
        .send(Category)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', ['Unauthorized Access'])
          done()
        })
        .catch(done)
    })
  })
  
  describe('category fail created', () => {
    test('add category fail because name is empty', function(done) {
      request(app)
        .post('/categories')
        .set('access_token', token)
        .send(CategoryEmpty)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Category cannot be empty'])
          done()
        })
        .catch(done)
    })
  })
  
  describe('category fail created', () => {
    test('add category fail because name is empty', function(done) {
      request(app)
        .post('/categories')
        .set('access_token', token)
        .send(CategoryEmpty)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Category cannot be empty'])
          done()
        })
        .catch(done)
    })
  })
  
  describe('category fail created', () => {
    test('add category fail because name is null', function(done) {
      request(app)
        .post('/categories')
        .set('access_token', token)
        .send(CategoryNull)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Category is required'])
          done()
        })
        .catch(done)
    })
  })
})

describe('GET /categories', function () {
  describe('successfully fetch all categoty', () => {
    test('get category succeed', function(done) {
      request(app)
        .get('/categories')
        .set('access_token', token)
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('categories')
          done()
        })
        .catch(done)
    })
  })

  describe('fetch category failed', () => {
    test('get category failed because there is no token', function(done) {
      request(app)
        .get('/categories')
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', ['Unauthorized Access'])
          done()
        })
        .catch(done)
    })
  })
})

describe('PUT /categories', function () {
  describe('category successfully created', () => {
    test('edit category succeed', function(done) {
      request(app)
        .post('/categories')
        .set('access_token', token)
        .send(Category)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('category')
          expect(body.category).toHaveProperty('id')
          expect(body.category).toHaveProperty('name', Category.name)
          done()
        })
        .catch(done)
    })
  })

  describe('category failed created', () => {
    test('edit category failed because there is no token', function(done) {
      request(app)
        .post('/categories')
        .send(Category)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', ['Unauthorized Access'])
          done()
        })
        .catch(done)
    })
  })
  
  describe('category fail created', () => {
    test('edit category fail because name is empty', function(done) {
      request(app)
        .post('/categories')
        .set('access_token', token)
        .send(CategoryEmpty)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Category cannot be empty'])
          done()
        })
        .catch(done)
    })
  })
})

describe('DELETE /categories', function () {
  describe('successfully delete category', () => {
    test('delete category succeed', function(done) {
      request(app)
        .delete('/categories/1')
        .set('access_token', token)
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('msg', 'Category deleted')
          done()
        })
        .catch(done)
    })
  })

  describe('delete category failed', () => {
    test('delete category failed because there is no token', function(done) {
      request(app)
        .delete('/categories')
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', ['Unauthorized Access'])
          done()
        })
        .catch(done)
    })
  })
})