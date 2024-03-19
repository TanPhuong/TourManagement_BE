const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        avatar: {
            type: String
        },
        passport: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false, 
            required: true
        },
        // access_token: {
        //     type: String,
        //     required: true
        // },
        // refresh_token: {
        //     type: String,
        //     required: true
        // }
        order: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Booking'
        }

    }
)

const user = mongoose.model('User', userSchema, 'User'); 

module.exports = user; 

