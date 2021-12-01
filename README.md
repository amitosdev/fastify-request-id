# Fastify Request Id [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

An alternative request id plugin for fastify

## Install

```bash
> npm install --save fastify-request-id
```

## Usage

```javascript
const Fastify = require('fastify')
const requestId = require('fastify-request-id')

const fastify = Fastify()

fastify.register(requestId())

fastify.get('/', (request, reply) => {
  console.log(request.reqId) // osUlY5xlcT
  reply.send({ hello: 'world' })
  // Response headers =>  x-request-id: osUlY5xlcT
})

```

## API

### `requestId([, pluginOpts])`

* `getId` (Function) - a custum funtion that return string (id). Default - random nano id with 10 charters
* `isAddToResponse` (Boolean) - add response header with request id. Default - true
* `headerName` (String) - if `isAddToResponse` is set to true, you can choose what will be the header name. Default - `x-request-id`
