const grpc = require('@grpc/grpc-js')
const BaseError = require('./BaseError')

class InvalidArgumentError extends BaseError {
  constructor(message) {
    super(grpc.status.INVALID_ARGUMENT, message)
  }
}

module.exports = InvalidArgumentError