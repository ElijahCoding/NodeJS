const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    password: String,
    photo: String,
    tweets: [{
         tweet: { type: Schema.Types.ObjectId, ref: 'Tweet'}
    }]
});

UserSchema.pre('save', (next) => {
    var user = this
    if (!user.isModified('password')) return next()
    if (user.password) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) return next();
                user.password = hash;
                next(err);
            })
        }
    }
})

UserSchema.methods.gravatar = function (size) {
    
}

module.exports = mongoose.model('User', UserSchema);
