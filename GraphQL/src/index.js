import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v1'

// Demo user data
let users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

let posts = [{
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

let comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '3',
    post: '10'
}, {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '1',
    post: '10'
}, {
    id: '104',
    text: 'This did no work.',
    author: '2',
    post: '11'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '1',
    post: '11'
}]



const resolvers = {
  Query: {
      users (parent, args, ctx, info) {
          if (!args.query) {
              return users
          }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
      },

      posts (parent, args, ctx, info) {
          if (!args.query) {
              return posts
          }

          return posts.filter((post) => {
              const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
              const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
              return isTitleMatch || isBodyMatch
          })
      },

      comments (parent, args, ctx, info) {
          if (!args.query) {
              return comments
          }

          return comments.filter(comment => {
              return comment.text.toLowerCase().includes(args.query.toLowerCase())
          })
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

  Mutation: {
      createUser (parent, args, ctx, info) {
          const emailTaken = users.some(user => user.email === args.data.email)

          if (emailTaken) {
              throw new Error('Email taken.')
          }

          const user = {
              id: uuidv4(),
              ...args.data
          }

          users.push(user)

          return user
      },

      deleteUser (parent, args, ctx, info) {
          const userIndex = users.findIndex(user => user.id === args.id)

          if (userIndex === -1) {
              throw new Error('User not found')
          }

          const deletedUsers = users.splice(userIndex, 1)

          posts = posts.filter(post => {
              const match = post.author === args.id

              if (match) {
                  comments = comments.filter(comment => comment.post !== post.id)
              }

              return !match
          })

          comments = comments.filter((comment) => comment.author !== args.id)

          return deletedUsers[0]
      },

      createPost (parent, args, ctx, info) {
          const userExists = users.some(user => user.id === args.data.author)

          if (!userExists) {
              throw new Error('User not found')
          }

          const post = {
              id: uuidv4(),
              ...args.data
          }

          posts.push(post)

          return post
      },

      deletePost (parent, args, ctx, info) {
          const postIndex = posts.findIndex(post => post.id === args.id)

          if (postIndex === -1) {
              throw new Error('No post found')
          }

          const deletedPosts = posts.splice(postIndex, 1)

          comments = comments.filter(comment => comment.post !== args.id)

          return deletedPosts[0]
      },

      createComment (parent, args, ctx, info) {
          const userExists = users.some(user => user.id === args.data.author)
          const postExists = posts.some(post => post.id === args.data.post)

          if (!userExists || !postExists) {
              throw new Error('Unable to find user and post')
          }

          const comment = {
              id: uuidv4(),
              ...args.data
          }

          comments.push(comment)

          return comment
      },

      deleteComment (parent, args, ctx, info) {
          const commentIndex = comments.findIndex(comment => comment.id === args.id)

          if (commentIndex === -1) {
              throw new Error('Comment not found')
          }

          const deletedComments = comments.splice(commentIndex, 1)

          return deletedComments[0]
      }
  },

  Post: {
      author (parent, args, ctx, info) {
          return users.find((user) => user.id === parent.author)
      },

      comments (parent, args, ctx, info) {
          return comments.filter(comment => comment.post === parent.id)
      }
  },

  User: {
      posts(parent, args, ctx, info) {
          return posts.filter((post) => {
              return post.author === parent.id
          })
      },

      comments(parent, args, ctx, info) {
          return comments.filter(comment => {
              return comment.author === parent.id
          })
      }
  },

  Comment: {
      author(parent, args, ctx, info) {
          return users.find(user => user.id === parent.author)
      },

      post (parent, args, ctx, info) {
          return posts.find(post => post.id === parent.post)
      }
  }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log('Server is running on localhost:4000'))
