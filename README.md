
## clone or download
```terminal
$ git clone https://github.com/Vishnu-Shakya/AirLine-Management.git
$ npm i
```

## project structure
```terminal
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^20
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client           // go to client folder
$ npm i              // npm install packages
$ npm run dev       // run it locally


## Server-side usage(PORT: 3000)
