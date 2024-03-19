
const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
    {
        nameTour: {
            type: String,
            required: true
        },
        imageTour: [{
            type: String
        }],
        typeTour: {
            type: String,
            default: "Tiết kiệm"
        },
        departurePlace: {
            type: String,
            required: true
        },
        departureDate: {
            type: String,
            required: true
        },
        departureTime: {
            type: String
        },
        travelDate: {
            type: String,
            required: true
        },
        adultPrice: {
            type: Number,
            required: true
        },
        teenPrice: {
            type: Number,
            required: true
        },
        childrenPrice: {
            type: Number,
            default: 0
        },
        infantPrice: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            required: true
        },
        transport: {
            type: String
        },
        visitedPlace: {
            type: String,
            required: true
        },
        food: {
            type: String
        },
        hotel: {
            type: String
        },
        suitableObject: {
            type: String,
            default: "Mọi người"
        },
        bestTimetogo: {
            type: String,
            default: "Quanh năm"
        },
        saleDescription: {
            type: String,
            default: "Đã bao gồm trong giá tour"
        },
        salePercent: {
            type: Number,
            default: 0
        },
        totalRevenue: {
            type: Number,
            default: 0
        }
    }
)

const Tour = mongoose.model('Tour', tourSchema, 'Tour'); 

module.exports = Tour; 

