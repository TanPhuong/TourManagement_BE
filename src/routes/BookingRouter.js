const express = require('express');
const router = express.Router();
const bookingController = require('../controller/BookingController');

router.post('/create/:id', bookingController.createBooking);
router.get('/get/:id', bookingController.getBooking);
router.get('/get-all',bookingController.getAllBooking);
router.put('/update/:id', bookingController.updateBooking);
router.delete('/delete/:id', bookingController.deleteBooking);
router.get('/count',bookingController.bookingCount);
router.get('/my-tour',bookingController.getBookedTour);
router.get('/get-booking/:page', bookingController.getAllTourPage);
router.get('/filter-booking', bookingController.filterBooking)
router.get('/search-booking', bookingController.searchBooking)

module.exports = router;
