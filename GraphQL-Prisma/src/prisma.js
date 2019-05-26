import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
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
