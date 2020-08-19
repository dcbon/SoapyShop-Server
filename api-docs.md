
---
### POST /register

> Register new user

_Request Body_
```
{
    "email": "admin@mail.com",
    "password": "123456"
}
```

_Response (201 - Created)_
```
{
    "msg": 'user admin@mail.com registered successfully'
}
```

_Response (400 - Bad Request)_
```
{
    "msg": [
        "Password must be 6 to 12 characters"
    ]
}

{
    "msg": [
        "Invalid email format"
    ]
}
{
    "msg": [
        "Email cannot be empty"
    ]
}
{
    "msg": [
        "Password cannot be empty"
    ]
}
{
    "msg": [
        "Please enter your email"
    ]
}
{
    "msg": [
        "Please enter your password"
    ]
}
{
    "msg": [
        "email must be unique"
    ]
}
{
    "msg": [
        "Password must be 6 to 12 characters"
    ]
}
```



---
### POST /login

> Login user

_Request Body_
```
{
    "email": "admin@mail.com",
    "password": "123456"
}
```

_Response (200 - OK)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNDQ1MDJ9.9EN8z9XvB5t3M6DPXKqUPX5jcZZssZUOndpQtCk56BY"
}
```

_Response (404 - Not Found)_
```
{
    "msg": [
        "Invalid email or password"
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Invalid email or password"
    ]
}
```



---
### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Body_
```
{
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": 50
}
```

_Response (201 - Created)_
```
{
    "product": {
        "id": 1,
        "name": "Glasses",
        "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
        "price": 500000,
        "stock": 50
        "updatedAt": "2020-08-11T11:32:09.015Z",
        "createdAt": "2020-08-11T11:32:09.015Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "msg": [
        "Name is required"
    ]
}
{
    "msg": [
        "Name cannot be empty"
    ]
}
{
    "msg": [
        "Please insert numeric price"
    ]
}
{
    "msg": [
        "Price cannot be less than 0"
    ]
}
{
    "msg": [
        "Price cannot be empty"
    ]
}
{
    "msg": [
        "Price is required"
    ]
}
{
    "msg": [
        "Stock is required"
    ]
}
{
    "msg": [
        "Stock cannot be empty"
    ]
}
{
    "msg": [
        "Please insert numeric stock"
    ]
}
{
    "msg": [
        "Stock cannot be less than 0"
    ]
}
{
    "msg": [
        "Price cannot be empty"
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized Access"
    ]
}
```



### GET /products

> Get all products 

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "products": [
        {
            "id": 1,
            "name": "Glasses",
            "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
            "price": 500000,
            "stock": 50
            "createdAt": "2020-08-11T11:32:09.015Z",
            "updatedAt": "2020-08-11T11:32:09.015Z"
        }
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized access"
    ]
}
```



---
### PUT /products/:id

> Updating certain product

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Params_
```
id=[integer]
```

_Request Body_
```
{
  "name": "Glasses",
  "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
  "price": 500000,
  "stock": 50
}
```

_Response (200 - OK)_
```
{
    "product": [
        1,
        [
            {
                "id": 1,
                "name": "Glasses",
                "image_url": "https://ca.slack-edge.com/T1UKZ9NBV-ULA08NBQT-6a07f794c443-512",
                "price": 500000,
                "stock": 50
                "createdAt": "2020-08-11T11:32:09.015Z",
                "updatedAt": "2020-08-11T11:36:52.101Z"
            }
        ]
    ]
}
```

_Response (400 - Bad Request)_
```
{
    "msg": [
        "Name is required"
    ]
}
{
    "msg": [
        "Name cannot be empty"
    ]
}
{
    "msg": [
        "Please insert numeric price"
    ]
}
{
    "msg": [
        "Price cannot be less than 0"
    ]
}
{
    "msg": [
        "Price cannot be empty"
    ]
}
{
    "msg": [
        "Price is required"
    ]
}
{
    "msg": [
        "Stock is required"
    ]
}
{
    "msg": [
        "Stock cannot be empty"
    ]
}
{
    "msg": [
        "Please insert numeric stock"
    ]
}
{
    "msg": [
        "Stock cannot be less than 0"
    ]
}
{
    "msg": [
        "Price cannot be empty"
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized Access"
    ]
}
```




---
### DELETE /products/:id

> Delete certain product

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Params_
```
id=[integer]
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "msg": "Product deleted"
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized access"
    ]
}
```