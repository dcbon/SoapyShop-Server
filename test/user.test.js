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

const registerEmptyPass = {
  email: 'john@mail.com',
  password: ''
}

const registerNullEmail = {
  email: null,
  password: '123123'
}

const registerNullPass = {
  email: 'john@mail.com',
  password: null
}

const registerNotEmail = {
  email: 'johnmail.com',
  password: '123123'
}

const registerPassLimitMin = {
  email: 'john@mail.com',
  password: '1231'
}

const registerPassLimitMax = {
  email: 'john@mail.com',
  password: '123123123123123'
}

const loginSuccess = {
  email: 'john@mail.com',
  password: '123123'
}

const loginWrongEmail = {
  email: 'john@doe.com',
  password: '123123'
}

const loginWrongPass = {
  email: 'john@mail.com',
  password: 'johndoe'
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
    test('register failed because email format is invalid', function(done) {
      request(app)
        .post('/users/register')
        .send(registerNotEmail)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Invalid email format'])
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
          expect(body).toHaveProperty('msg', ['Invalid email format', 'Email cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because password is empty', function(done) {
      request(app)
        .post('/users/register')
        .send(registerEmptyPass)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Password must be 6 to 12 characters', 'Password cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because email is null', function(done) {
      request(app)
        .post('/users/register')
        .send(registerNullEmail)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please enter your email'])
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because password is null', function(done) {
      request(app)
        .post('/users/register')
        .send(registerNullPass)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please enter your password'])
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because password is less than 6', function(done) {
      request(app)
        .post('/users/register')
        .send(registerPassLimitMin)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Password must be 6 to 12 characters'])
          done()
        })
        .catch(done)
    })
  })

  describe('user register failed', () => {
    test('register failed because password is greater than 12', function(done) {
      request(app)
        .post('/users/register')
        .send(registerPassLimitMax)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Password must be 6 to 12 characters'])
          done()
        })
        .catch(done)
    })
  })
})

describe('POST /login', function() {

  describe('user login success', () => {
    test('user login successfully', function(done) {
      request(app)
        .post('/users/login')
        .send(loginSuccess)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
        })
        .catch(done)
    })
  })

  describe('user login fail', () => {
    test('user login failed because email is wrong', function(done) {
      request(app)
        .post('/users/login')
        .send(loginWrongEmail)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(404)
          expect(body).toHaveProperty('msg', ['Invalid email or password'])
          done()
        })
        .catch(done)
    })
  })

  describe('user login fail', () => {
    test('user login failed because password is wrong', function(done) {
      request(app)
        .post('/users/login')
        .send(loginWrongPass)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', ['Invalid email or password'])
          done()
        })
        .catch(done)
    })
  })
})