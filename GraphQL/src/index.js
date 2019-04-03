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
        published: Boolean!
    }
`

const resolvers = {
    Query: {
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
