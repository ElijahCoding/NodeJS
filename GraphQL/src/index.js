import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
      me: User!
      post: Post!
  }

  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
  }

  type Post {
      id: ID!
      title: String!
      body: String!
  }
`

const resolvers = {
  Query: {
      me () {
          return {
              id: '123',
              name: 'elijah',
              email: 'elijah@gmail.com',
          }
      },

      post () {
          return {
              id: '345',
              title: 'new post',
              body: 'new body'
          }
      }
  },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('Server is running on localhost:4000'))
