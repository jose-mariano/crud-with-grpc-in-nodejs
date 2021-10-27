const grpc = require('@grpc/grpc-js')
const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
  constructor(message) {
    super(grpc.status.NOT_FOUND, message)
  }
}

module.exports = NotFoundError