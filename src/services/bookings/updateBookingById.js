import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updateBookingById = async (
    id,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
    propertyId,
    userId
) => {
    const primsa = new PrismaClient();

    const booking = await primsa.booking.updateMany({
        where: { id: id },
        data: {
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
            numberOfGuests: Number(numberOfGuests),
            totalPrice: Number.parseFloat(totalPrice),
            bookingStatus: bookingStatus,
            propertyId: propertyId,
            userId: userId
        }
    });

    if (!booking) {
        throw new notFoundError("Booking", id);
    } else return booking;
};

export default updateBookingById;