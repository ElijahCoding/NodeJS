import { GraphQLServer } from 'graphql-yoga'
import { resolvers } from './resolvers'
import prisma from './prisma'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context (request) {
        return {
            prisma,
            request
        }
    }
})

server.start(() => console.log('Server is running on localhost:4000'))
