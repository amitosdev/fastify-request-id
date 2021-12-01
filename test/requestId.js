const { test } = require('tap')
const Fastify = require('fastify')
const requestId = require('../requestId')

const nanoIdRegex = /^[0-9a-zA-Z]{10}$/

test('with default configuration', t => {
  const fastify = Fastify()

  fastify.register(requestId())

  fastify.get('/', (request, reply) => {
    t.match(request, { reqId: nanoIdRegex })
    reply.send({ hello: 'world' })
  })

  fastify.inject(
    {
      method: 'GET',
      url: '/'
    },
    (err, res) => {
      t.error(err)
      t.match(res.headers, { ['x-request-id']: nanoIdRegex })
      t.end()
    }
  )
})

test('with custom configuration - getId', t => {
  const id = 'abc123'
  const getId = () => id

  const fastify = Fastify()

  fastify.register(requestId({ getId }))

  fastify.get('/', (request, reply) => {
    t.match(request, { reqId: id })
    reply.send({ hello: 'world' })
  })

  fastify.inject(
    {
      method: 'GET',
      url: '/'
    },
    (err, res) => {
      t.error(err)
      t.match(res.headers, { ['x-request-id']: id })
      t.end()
    }
  )
})

test('with custom configuration - isAddToResponse', t => {
  const fastify = Fastify()

  fastify.register(requestId({ isAddToResponse: false }))

  fastify.get('/', (request, reply) => {
    t.match(request, { reqId: nanoIdRegex })
    reply.send({ hello: 'world' })
  })

  fastify.inject(
    {
      method: 'GET',
      url: '/'
    },
    (err, res) => {
      t.error(err)
      t.notMatch(res.headers, { ['x-request-id']: nanoIdRegex })
      t.end()
    }
  )
})

test('with custom configuration - headerName', t => {
  const fastify = Fastify()
  const headerName = 'x-foo-bar'
  fastify.register(requestId({ headerName }))

  fastify.get('/', (request, reply) => {
    t.match(request, { reqId: nanoIdRegex })
    reply.send({ hello: 'world' })
  })

  fastify.inject(
    {
      method: 'GET',
      url: '/'
    },
    (err, res) => {
      t.error(err)
      t.match(res.headers, { [headerName]: nanoIdRegex })
      t.end()
    }
  )
})
