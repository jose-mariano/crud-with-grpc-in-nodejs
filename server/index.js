const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const { NotFoundError } = require('./GrpcErrors')
const path = require('path')

const host = '127.0.0.1'
const port = '50051'

const users = [
  { id: 1, name: 'José Mariano', email: 'jose@test.com', password: 'testjose1234' },
  { id: 2, name: 'No One', email: 'no.one@test.com', password: 'no1234one' }
]


const userPackageDefinition = protoLoader.loadSync(
  path.resolve('users.proto')
)
const UserService = grpc.loadPackageDefinition(userPackageDefinition).UserService


const server = new grpc.Server();

server.addService(UserService.service, {
  getUserById: (call, callback) => {
    const { id } = call.request

    try {
      const user = users[id - 1]

      if (!user) {
        throw new NotFoundError('User not found')
      }

      return callback(null, { user })
    } catch (error) {
      return callback(error)
    }
  }
})

server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.log(error.message)
    return
  }

  console.log(`Server up in ${host}:${port}`)
  server.start()
})