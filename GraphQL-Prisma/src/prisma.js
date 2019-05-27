import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id }')
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{ id name email email posts { id title published } }')

    return user
}

createPostForUser('cjw510scn000i0933s8qsxpm4', {
    title: 'Great books to read',
    body: 'The War of Art',
    published: true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
})

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })

    if (!postExists) {
       throw new Error('Post not found')
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id } }')

    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name email posts { id title published } }')
    return user
}
