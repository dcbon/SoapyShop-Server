const request = require('supertest')
const app = require('../app')

const registerInput = {
  email: 'john@mail.com',
  password: '123123'
}

const registerEmpty = {
  email: '',
  password: ''
}

const registerNull = {
  email: null,
  password: null
}

describe('POST /register', function() {
  describe('user register succeed', () => {
    test('register succeed with response json', function(done) {
      request(app)
        .post('/users/register')
        .send(registerInput)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(201)
          expect(body).toEqual({
            msg: `user ${registerInput.email} registered successfully`
          })
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because email is already exist', function(done) {
      request(app)
        .post('/users/register')
        .send(registerInput)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['email must be unique'])
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because email and password is empty', function(done) {
      request(app)
        .post('/users/register')
        .send(registerEmpty)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Invalid email format', 'Email cannot be empty', 'Password must be 6 to 12 characters', 'Password cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because email and password is null', function(done) {
      request(app)
        .post('/users/register')
        .send(registerNull)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please enter your email', 'Please enter your password'])
          done()
        })
        .catch(done)
    })
  })
})