const Tour = require('../models/TourModel');
const fs = require('fs');

// createTour
const createTour = (newTour) => {
    return new Promise( async (resolve, reject) => {
        const {nameTour, imageTour, typeTour,departurePlace,  departureDate, departureTime, 
            travelDate, adultPrice, teenPrice, childrenPrice, infantPrice, quantity, transport, visitedPlace, food, hotel, 
            suitableObject, saleDescription
            , salePercent} = newTour;
        try {
            const checkTour = await Tour.findOne({
                name: nameTour
            })

            if(checkTour !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name tour is already'
                })
            }
            

            const newTour = await Tour.create({
                nameTour, 
                imageTour, 
                typeTour, departurePlace,  departureDate, departureTime, 
                travelDate, adultPrice, teenPrice, childrenPrice, infantPrice, quantity, transport, visitedPlace, food, hotel, 
                suitableObject, saleDescription, salePercent
            })
            if(newTour) {
                resolve({
                    status: 'Success',
                    data: newTour
                })
            }   
        }catch (error) {
            reject(error);
        }
    })
}; 

// Update tour
const updateTour = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTour = await Tour.findOne({
                _id: id
            })

            if(checkTour === null) {
                resolve({
                    status: 'OK',
                    message: 'The tour is not defined'
                })
            }

            const updateTour = await Tour.findByIdAndUpdate(id, data, {new:true})

            resolve({
                status:'OK',
                message:'SUCCESS',
                data: updateTour
            })
        } catch (error) {
            reject(error);
        }
    })
}

// detail Tour 
const detailTour = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tour = await Tour.findOne({
                _id: id
            })

            if(tour === null) {
                resolve({
                    status: 'OK',
                    message: 'The tour is not defined'
                })
            }

            resolve({
                status:'OK',
                message:'SUCCESS',
                tour
            })
        } catch (error) {
            reject(error);
        }
    })
}

// delete Tour 
const deleteTour = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTour = await Tour.findOne({
                _id: id
            })

            if(checkTour === null) {
                resolve({
                    status: 'OK',
                    message: 'The tour is not defined'
                })
            }

            await Tour.findByIdAndDelete(id)

            resolve({
                status:'OK',
                message:'delete tour success',
                data: checkTour
            })
        } catch (error) {
            reject(error);
        }
    })
}

// list Tour 
const getListTour = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allTour = await Tour.find();
            resolve({
                status:'OK',
                message:'success',
                allTour
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createTour,
    updateTour,
    detailTour,
    deleteTour,
    getListTour
}