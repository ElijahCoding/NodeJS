import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
      greeting(name: String, position: String): String!
      add(numbers: [Float!]!): Float!
      grades: [Int!]!
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
      greeting (parent, args, ctx, info) {
          if (args.name && args.position) {
              return `hello ${args.name}! You are ${args.position}`
          } else {
              return 'hello'
          }
      },

      add (parent, args, ctx, info) {
          if (args.numbers.length === 0) {
              return 0
          }

          return args.numbers.reduce((accumulator, currentValue) => {
              return accumulator + currentValue
          })
      },

      grades (parent, args, ctx, info) {
          return [1, 3, 5]
      },

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
