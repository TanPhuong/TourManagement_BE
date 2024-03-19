const TourService = require('../services/TourService');
const fs = require('fs');
const Booking = require('../models/BookingModel')
const Tour = require('../models/TourModel');



// Create Tour  
const createTour = async (req, res) => {
    try {
        const {nameTour, imageTour, typeTour, departurePlace,  departureDate, departureTime, 
            travelDate, adultPrice, teenPrice, childrenPrice, infantPrice, quantity, transport, visitedPlace, food, hotel, 
            suitableObject, saleDescription
            , salePercent} = req.body;

        // if(!nameTour){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'Hãy nhập tên tour du lịch'
        //     })
        // } else if(!departureDate) {
        //     const currentDate = new Date(); // Lấy ngày hiện tại
        //     const formattedDate = currentDate.toISOString().split('T')[0]; // Chuyển đổi thành chuỗi ngày tháng
        //     //ví dụ: "2023-10-15T15:30:00.000Z") và .split('T')[0] chỉ lấy phần ngày (ví dụ: "2023-10-15").

        //     req.body.departureDate = formattedDate; // Gán ngày hiện tại vào departureDate

        // } else if(!departureTime){
        //     const currentTime = new Date(); // Lấy thời gian hiện tại
        //     const formattedTime = currentTime.toISOString().split('T')[1].split('.')[0]; // Chuyển đổi thành chuỗi thời gian

        //     req.body.departureTime = formattedTime;
        // } else if(!travelDate){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'Hãy nhập thời gian tour'
        //     })
        // } else if(!adultPrice){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'Hãy nhập giá tour du lịch'
        //     })
        // } else if(!quantity){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'Hãy nhập số lượng tour du lịch'
        //     })
        // } else if(!departurePlace){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'Hãy nhập điểm khởi hành của tour du lịch'
        //     })
        // } else if(!visitedPlace){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'Hãy nhập điểm đến của tour du lịch'
        //     })
        // } else if(!transport){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'Hãy nhập phương tiện di chuyển'
        //     })
        // }
        const respond = await TourService.createTour(req.body);
        
        return res.status(200).json(respond);
    } catch(error) {
        return res.status(400).json({
            message: error
        });
    }
}

// update Tour 
const updateTour = async (req, res) => {
    try {
        const tourId = req.params.id
        const data = req.body

        if(!tourId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Hãy nhập id tour'
            })
        }
        const response = await TourService.updateTour(tourId, data)

        return res.status(200).json(response)

    }catch(error) {
        return res.status(404).json({
            message: error
        });
    }
}

// detail Tour 
const detailTour = async (req, res) => {
    try {
        const tourId = req.params.id

        if(!tourId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }
        const response = await TourService.detailTour(tourId)

        return res.status(200).json(response)

    }catch(error) {
        return res.status(404).json({
            message: error
        });
    }
}

// delete Tour 
const deleteTour = async (req, res) => {
    try {
        const tourId = req.params.id

        if(!tourId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }
        const response = await TourService.deleteTour(tourId)

        return res.status(200).json(response)

    }catch(error) {
        return res.status(404).json({
            message: error
        });
    }
}

// list Tour 
const listTour = async (req, res) => {
    try {
        const response = await TourService.getListTour()
        return res.status(200).json(response)

    }catch(error) {
        return res.status(404).json({
            message: error
        });
    }
}

// const revenueTour = async (req, res) => {
//     try {
//         const response = await TourService.getListTour()
        
//         // const tours = response.allTour;
//         // let tourRevenues = [];
//         // for (const tour of tours){
//         //     const bookings = await Booking.find({ Tour: tour._id }).populate('TourR');
//         //     if(bookings.length > 0){
//         //         let totalRevenue = 0;
//         //     bookings.forEach((booking) =>{
//         //         const {
//         //             numberOfAdult,
//         //             numberOfTeen,
//         //             numberOfChildren,
//         //             numberOfInfant
//         //         } = booking;
//         //             const {
//         //             adultPrice,
//         //             teenPrice,
//         //             childrenPrice,
//         //             infantPrice
//         //         } = booking.tour;
                
//         //         const bookingRevenue = (numberOfAdult * adultPrice) + (numberOfTeen * teenPrice) + (numberOfChildren * childrenPrice) + (numberOfInfant * infantPrice);
//         //         totalRevenue += bookingRevenue;
                
//         //     });
//         //     // Cập nhật trường totalRevenue của tour
//         //     await Tour.findByIdAndUpdate(tour._id ,{totalRevenue} );
//         //     tourRevenues.push({
//         //         tourId: tour._id,
//         //         tourName: tour.nameTour,
//         //         totalRevenue: totalRevenue,
//         //     });
//         //     }
//         // }
        
//         return res.status(200).json({ tourRevenues });
//     }catch (error) {
//         return res.status(404).json({ message: error });
//     }
// }


const revenueTour = async(req,res) =>{
    try {
        const response = await TourService.getListTour()
        const tours = response.allTour;
        let tourRevenues = [];
        for (const tour of tours){
            const bookings = await Booking.find({ TourR: tour._id }).populate('TourR');
            console.log(bookings)
            if(bookings.length > 0){
                let totalRevenue = 0;
            bookings.forEach((booking) =>{
                const {
                    numberOfAdult,
                    numberOfTeen,
                    numberOfChildren,
                    numberOfInfant,
                } = booking;
                    const {
                    adultPrice,
                    teenPrice,
                    childrenPrice,
                    infantPrice,
                } = booking.TourR;
                const bookingRevenue = (numberOfAdult * adultPrice) + (numberOfTeen * teenPrice) + (numberOfChildren * childrenPrice) + (numberOfInfant * infantPrice);
                totalRevenue += bookingRevenue;
                
            });
            // Cập nhật trường totalRevenue của tour
            await Tour.findByIdAndUpdate(tour._id ,{totalRevenue} );
            tourRevenues.push({
          tourId: tour._id,
          tourName: tour.nameTour,
          totalRevenue: totalRevenue,
        });
            }
        }
        
        return res.status(200).json({ tourRevenues });
    }catch (error) {
  console.error('Error fetching tours:', error);
  return res.status(500).json({ message: error });
}
}


// detail Tour 
const detailTourBooking = async (req, res) => {
    try {
        const tourId = req.query.id

        if(!tourId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Lỗi'
            })
        }
        const response = await TourService.detailTour(tourId)

        return res.status(200).json(response)

    }catch(error) {
        return res.status(404).json({
            message: error
        });
    }
}

// search 
const searchTour = async(req, res) => {
    try {
        const tour = req.query.place; 

        const checkTour = await Tour.find({
            visitedPlace: tour
        })

        return res.status(200).json({status: true,message: "Successful", checkTour}) 
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}

module.exports = {
    createTour,
    updateTour,
    detailTour,
    deleteTour,
    listTour,
    revenueTour,
    detailTourBooking,
    searchTour
}