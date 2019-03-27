const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Elijah',
        email: 'elijah@gmail.com',
        password: 'hellojava'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Elijah',
            email: 'elijah@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('hellojava')

})

test('Shoud login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should ot login nonexistent user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'fd'
    })
})

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
                      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                      .send()
                      .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me')
                      .send()
                      .expect(401)

})

test('Should delete account for user', async () => {
    await request(app).delete('/users/me')
                      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                      .send()

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app).delete('/users/me')
                      .send()
                      .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
                      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                      .attach('avatar', 'tests/fixures/doc.png')
                      .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app).patch('/users/me')
                      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                      .send({
                          name: 'ivan'
                      })
                      .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('ivan')
})

test('Should not update invalid user fields', async () => {
    await request(app).patch('/users/me')
                      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                      .send({
                          localtion: 'russia'
                      })
                      .expect(400)
})
