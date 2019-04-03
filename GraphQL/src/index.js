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

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]

const comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '1'
}, {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '2'
}, {
    id: '104',
    text: 'This did no work.',
    author: '2'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '3'
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
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

        posts (parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter(post => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },

        comments (parent, args, ctx, info) {
            return comments
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
    },

    Post: {
        author (parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        }
    },

    User: {
        posts (parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
        },

        comments (parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id)
        }
    },

    Comment: {
        author (parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
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
