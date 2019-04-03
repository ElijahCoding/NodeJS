import { GraphQLServer } from 'graphql-yoga'

const users = [
    {
        id: '1',
        name: 'ivan',
        email: 'ivan@gmail.com',
        age: 22
    },
    {
        id: '2',
        name: 'sarah',
        email: 'sarah@gmail.com',
    },
    {
        id: '3',
        name: 'elijah',
        email:  'elijah@elijah.com',
        age: 30
    }
]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
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
        users (parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
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
