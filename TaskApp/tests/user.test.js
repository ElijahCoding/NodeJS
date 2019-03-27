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
    await request(app).post('/users').send({
        name: 'Elijah',
        email: 'elijah@gmail.com',
        password: 'hellojava'
    }).expect(201)
})

test('Shoud login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should ot login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'fd'
    })
})
