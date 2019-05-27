const Query = {
    users (parent, args, { prisma }, info) {
        return prisma.query.users(null, info)
    },

    posts (parent, args, { db }, info) {
        return prisma.query.posts(null, info)
    },

    comments (parent, args, { db }, info) {
        if (!args.query) {
            return db.comments
        }

        return db.comments.filter(comment => {
            return comment.text.toLowerCase().includes(args.query.toLowerCase())
        })
    }
}

export { Query as default }
