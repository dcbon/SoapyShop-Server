const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')

const user = {
  id: 16,
  email: 'admin@mail.com',
  role: 'admin'
}

const token = generateToken(user)

const Product = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": 50,
  "CategoryId": 1
}

const NameEmpty = {
  "name": "",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": 50,
  "CategoryId": 1
}

const NameNull = {
  "name": null,
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": 50,
  "CategoryId": 1
}

const PriceNotNum = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": '500000o',
  "stock": 50,
  "CategoryId": 1
}

const PriceMin = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": -500000,
  "stock": 50,
  "CategoryId": 1
}

const PriceEmpty = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": "",
  "stock": 50,
  "CategoryId": 1
}

const PriceNull = {
  "name":  "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": null,
  "stock": 50,
  "CategoryId": 1
}

const StockNotNum = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": '50o',
  "CategoryId": 1
}

const StockMin = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": -1,
  "CategoryId": 1
}

const StockEmpty = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": "",
  "CategoryId": 1
}

const StockNull = {
  "name":  "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": null,
  "CategoryId": 1
}

const CategoryEmpty = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": 50,
  "CategoryId": ""
}

const CategoryNull = {
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": 50,
  "CategoryId": null
}

describe('POST /products', function() {
  describe('product successfully created', () => {
    test('add product succeed', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(Product)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('product')
          expect(body.product).toHaveProperty('id')
          expect(body.product).toHaveProperty('name', Product.name)
          expect(body.product).toHaveProperty('image_url', Product.image_url)
          expect(body.product).toHaveProperty('price', Product.price)
          expect(body.product).toHaveProperty('stock', Product.stock)
          expect(body.product).toHaveProperty('CategoryId')
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because there is no token', function(done) {
      request(app)
        .post('/products')
        .send(Product)
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

  describe('product failed created', () => {
    test('add product failed because product name is empty', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(NameEmpty)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Name cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product name is null', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(NameNull)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Name is required'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product price is not numeric', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(PriceNotNum)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric price'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product price is less than 0', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(PriceMin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Price cannot be less than 0'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product price is empty', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(PriceEmpty)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric price', 'Price cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product price is null', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(PriceNull)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Price is required'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product stock is not numeric', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(StockNotNum)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric stock'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product stock is less than 0', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(StockMin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Stock cannot be less than 0'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product stock is empty', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(StockEmpty)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric stock', 'Stock cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product stock is null', function(done) {
      request(app)
        .post('/products')
        .set('access_token', token)
        .send(StockNull)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Stock is required'])
          done()
        })
        .catch(done)
    })
  })

  describe('product failed created', () => {
    test('add product failed because product category is empty', function(done) {
      request(app)
        .post('/products')
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

  describe('product failed created', () => {
    test('add product failed because product category is null', function(done) {
      request(app)
        .post('/products')
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

describe('GET /products', function() {
  describe('successfully fetch all product', () => {
    test('get product succeed', function(done) {
      request(app)
        .get('/products')
        .set('access_token', token)
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('products')
          done()
        })
        .catch(done)
    })
  })

  describe('fetch product failed', () => {
    test('get product failed because there is no token', function(done) {
      request(app)
        .get('/products')
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

describe('PUT /products', function() {
  describe('product successfully updated', () => {
    test('update product succeed', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(Product)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('product')
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because there is no token', function(done) {
      request(app)
        .put('/products/1')
        .send(Product)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', ['Unauthorized Access'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product name is empty', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(NameEmpty)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Name cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product name is null', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(NameNull)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Name is required'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product price is not numeric', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(PriceNotNum)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric price'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product price is less than 0', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(PriceMin)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Price cannot be less than 0'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product price is empty', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(PriceEmpty)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric price', 'Price cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product price is null', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(PriceNull)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Price is required'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product stock is not numeric', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(StockNotNum)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric stock'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product stock is less than 0', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(StockMin)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Stock cannot be less than 0'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product stock is empty', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(StockEmpty)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Please insert numeric stock', 'Stock cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product stock is null', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(StockNull)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Stock is required'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product Category is empty', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(CategoryEmpty)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', ['Category cannot be empty'])
          done()
        })
        .catch(done)
    })
  })

  describe('product update failed', () => {
    test('update product failed because product Category is null', function(done) {
      request(app)
        .put('/products/1')
        .set('access_token', token)
        .send(CategoryNull)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
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

describe('DELETE /products', function() {
  describe('successfully delete product', () => {
    test('delete product succeed', function(done) {
      request(app)
        .delete('/products/1')
        .set('access_token', token)
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
          const { status, body } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('msg', 'Product deleted')
          done()
        })
        .catch(done)
    })
  })

  describe('delete product failed', () => {
    test('delete product failed because there is no token', function(done) {
      request(app)
        .delete('/products')
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