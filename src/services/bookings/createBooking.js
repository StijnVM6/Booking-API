import { PrismaClient } from "@prisma/client";

const createBooking = async (
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
    propertyId,
    userId
) => {
    const primsa = new PrismaClient();

    const booking = await primsa.booking.create({
        data: {
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
            numberOfGuests: numberOfGuests,
            totalPrice: totalPrice,
            bookingStatus: bookingStatus,
            propertyId: propertyId,
            userId: userId
        }
    });

    return booking;
};

export default createBooking;