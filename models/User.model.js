const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        mni: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilepic: {
        type: String,
        default: '',
    },
    isadmin: {
        type: Boolean,
        default: false,
    },
    }, 
    { timestamps: true }
);


module.exports = mongoose.model('User', UserSchema);