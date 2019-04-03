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
        published: Boolean!
    }
`

const resolvers = {
    Query: {
        greeting (parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello ${args.name} and your positions is ${args.position}`
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
            return [1,2,3]
        },

        me () {
            return {
                id: '123',
                name: 'elijah',
                email:  'elijah@elijah.com',
                age: 22
            }
        },

        post () {
            return {
                id: '456',
                title: 'post one',
                body: 'body one',
                published: true
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up')
})
