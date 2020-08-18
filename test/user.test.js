const request = require('supertest')
const app = require('../app')

const registerInput = {
  email: 'john@mail.com',
  password: '123123'
}

const registerEmptyEmail = {
  email: '',
  password: '123123'
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
    test('register failed because email is empty', function(done) {
      request(app)
        .post('/users/register')
        .send(registerEmptyEmail)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty(errors, ['Email cannot be empty'])
          done()
        })
        .catch(done)
    })
  })
})