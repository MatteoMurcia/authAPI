<h1 align="center">Authentication API</h1>

> Api exercise for authentication backend

## 📚 Pre-requisites

- Node (recommended version 16.17) ([Install from here](https://nodejs.org/es/))

## 🏗 Installation

once you clone the proyect you should install the following modules:

```bash
#you need to setup express, bcrypt and jsonwebtoken
npm install express
npm install bcrypt
npm install jsonwebtoken
```

## 🏄 Run 

First you have tu run the server with the command:

```bash
npm start
```

For testing, we have a test user:

- user: Test

- password: 1234

The user will have another data called **status**, if the user had logged in previously the status will be **true** and, when the user log out it will became **false**.

### login

You can call it using the method **POST** with the path **/auth/login** and, in the body send a json like this:

```json
{
  "user":"Test",
  "password":"1234"
}
```
If the login is ok, it will return a status 200 and a json with a JWT like this:

```json
{
	"status": "success",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzU5OTQwNjEsImV4cCI6MTY3NTk5NzY2MX0.v75eEREY_oUnIIMWYnS3p8wS6dCuTHjIf9wVuxNTzfs"
}
```

If somthing goes wrong with the login, it will return a status 400 and one of the folowwing answers:

```json
{
	"status": "failure",
	"message": "User already logged in"
}

{
	"status": "failure",
	"message": "Invalid username or password"
}
```
Any other mistake will return a status 500.

# logout

You can call it using the method **POST** with the path **/auth/logout** and, in the body send a json like this:

```json
{
	"username":"Test"
}
```

if the  user name dosen't exist, it will return a status 400 and a message like this:

```json
{
	"status": "failure",
	"message": "Invalid username or password"
}
```

Any other mistake will return a status 500.

# register

if you want to test with another user, you can create your own user with this method. You can call it using the method **POST** with the path **/auth/register** and, in the body send a json like this:

```json
{
  "user":"Test",
  "password":"1234"
}
```

it will return a status 201.
