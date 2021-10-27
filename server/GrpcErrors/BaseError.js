class BaseError extends Error {
  constructor(grpcStatus, errorMessage) {
    super(errorMessage)
    this.code = grpcStatus
  }
}

module.exports = BaseError