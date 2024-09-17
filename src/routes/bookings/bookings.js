import express from "express";
import getBookings from "../../services/bookings/getBookings.js";
import getBookingById from "../../services/bookings/getBookingById.js";
import createBooking from "../../services/bookings/createBooking.js";
import updateBookingById from "../../services/bookings/updateBookingById.js";
import deleteBookingById from "../../services/bookings/deleteBookingById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const bookings = await getBookings();
        res.status(200).json(bookings);
    } catch (err) {
        next(err)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);
        res.status(200).json(booking);
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.post("/", async (req, res, next) => {
    try {
        const {
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
            propertyId,
            userId
        } = req.body;

        const newBooking = await createBooking(
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
            propertyId,
            userId
        );

        res.status(201).json(newBooking);
    } catch (err) {
        next(err)
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
            propertyId,
            userId
        } = req.body;

        await updateBookingById(
            id,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
            propertyId,
            userId
        );

        res.status(200).json({ message: `Booking with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", async (res, req, next) => {
    try {
        const { id } = req.params;
        await deleteBookingById(id);
        res.status(200).json({ message: `Booking with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;