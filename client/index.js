const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const host = '127.0.0.1'
const port = '50051'

const userPackageDefinition = protoLoader.loadSync(
  path.resolve('..', 'server', 'users.proto')
)

const UserService = grpc.loadPackageDefinition(userPackageDefinition).UserService

const server = new UserService(`${host}:${port}`, grpc.credentials.createInsecure())

server.getUsers({}, (error, result) => {
  if (error) {
    console.log(error.message)
    return
  }

  console.table(result.users)
})

server.getUserById({ id: 1 }, (error, result) => {
  if (error) {
    console.log(error.message)
    return
  }

  console.log(result)
})