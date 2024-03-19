const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema(
    {
        TourR: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tour'
        },
        registerName: {
            type: String,
            required: true
        },
        registerEmail: {
            type: String,
            required: true
        },
        registerPhone: {
            type: String
        },
        registerAddress: {
            type: String
        },
        quantity: {
            type: Number,
            required: true
        },
        payPrice: {
            type: Number
        },
        customerName: [{
            type: String
        }],
        customerPassport: [{
            type: String
        }],
        customerType: [{
            type: String
        }],
        status: {
            type: String,
            default: "Chưa thanh toán"
        },
        numberOfAdult: {
            type: Number
        }, 
        numberOfTeen: {
            type: Number
        },
        numberOfChildren: {
            type: Number
        },
        numberOfInfant: {
            type: Number
        },
        paymentMethod: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const booking = mongoose.model('Booking', bookingSchema, 'Booking'); 

module.exports = booking; 