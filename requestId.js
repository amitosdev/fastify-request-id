const fp = require('fastify-plugin')
const { customAlphabet } = require('nanoid')
const isFunction = require('lodash.isfunction')
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const getNanoId = customAlphabet(alphabet, 10)

module.exports = ({
  getId = getNanoId,
  isAddToResponse = true,
  headerName = 'x-request-id'
} = {}) => {
  if (!isFunction(getId)) throw new Error('getId must be a function')

  function plugin (instance, options, done) {
    instance.decorateRequest('reqId', '')

    instance.addHook('onRequest', (request, reply, next) => {
      request.reqId = getId()
      next()
    })

    if (isAddToResponse) {
      instance.addHook('onSend', (request, reply, payload, next) => {
        reply.header(headerName, request.reqId)
        next()
      })
    }

    done()
  }

  return fp(plugin, {
    fastify: '>= 3',
    name: 'request-id'
  })
}
