import uuidv4 from 'uuid/v1'

const Mutation = {
    async createUser (parent, args, { prisma }, info) {
        return prisma.mutation.createUser({ data: args.data }, info)
    },

    async deleteUser (parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },

    async updateUser (parent, args, { prisma }, info) {
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },

    async createPost (parent, args, { prisma, pubsub }, info) {
        return prisma.mutaion.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info)
    },

    async deletePost (parent, args, { prisma, pubsub }, info) {
        
    },

    async updatePost (parent, args, { prisma }, info) {

    },

    async createComment (parent, args, { prisma, pubsub }, info) {

    },

    async deleteComment (parent, args, { prisma, pubsub }, info) {

    },

    async updateComment (parent, args, { prisma, pubsub }, info) {

    }
}

export { Mutation as default }
