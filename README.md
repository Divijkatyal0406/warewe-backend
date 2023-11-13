# Warewe Content Toolbox API
A robust backend service crafted for Warewe's assignment. This API, influenced by Warewe's Content Toolbox service, empowers seamless management of user and content data. Built with Node.js, Express, and Prisma, it offers versatile endpoints for creating, fetching, updating, and deleting entries.
## Features
**User Management:** Effortlessly handle user information with CRUD operations.<br>
**Content Operations:** Manage content entries, including titles, descriptions, and user associations.

## API Testing with Postman-like UI
To facilitate easy testing of the Warewe Assignment APIs, a Postman-like UI has been integrated into the project as mentioned in assignment details.
Deployed URL - https://warewe-frontend.onrender.com

## Installation
```
git clone https://github.com/Divijkatyal0406/warewe-backend.git
cd warewe-backend
npm install
```

## Usage
Launch the API server locally: `node app.js`<br>
Launch Deployed Service: https://warewe-backend-sb64.onrender.com/

# Prisma Models
```
model Content {
  id Int @id @default(autoincrement())
  title String @unique
  description String
  createdAt DateTime @default(now())
  User User? @relation(fields: [userId],references: [id])
  userId Int?
}

model User {
  id Int @id @default(autoincrement())
  username String @unique
  email String @unique
  contents Content[]
}

model HistoricalRequest {
  id Int @id @default(autoincrement())
  method String
  originalUrl String
  timestamp DateTime @default(now())
}
```

# API Endpoints
## Get List of Users

### Request

`GET /api/users`

## Create a New User

### Request

`POST /api/users/`

### Body
```
{
  "username": "sample",
  "email":"sample@gmail.com"
}
```

## Get a specific User

### Request

`GET /api/users/user`

### Query Parameters
```
Parameter: id
value: INTEGER id
```

## Delete a User

`DELETE /api/users`

### Query Parameters
```
Parameter: id
value: INTEGER id
```

## Edit a User

`PUT /api/users`
### Body
```
{
  "username": "newsample",
  "email":"newsample@gmail.com"
}
```


## Get List of Contents

### Request

`GET /api/contents`

## Create a New Content

### Request

`POST /api/contents/`

### Body
```
{
  "title": "sample content",
  "description":"sample description",
  "userId":1
}
```

## Get a specific Content

### Request

`GET /api/contents/content`

### Query Parameters
```
Parameter: id
value: INTEGER id
```

## Delete a Content

`DELETE /api/contents`

### Query Parameters
```
Parameter: id
value: INTEGER id
```

## Edit a Content

`PUT /api/contents`
### Body
```
{
  "title": "new sample content",
  "description":"new sample description",
  "userId":1
}
```
