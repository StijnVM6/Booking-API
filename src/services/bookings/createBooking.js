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
    const prisma = new PrismaClient();

    const booking = await prisma.booking.create({
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

    return booking;
};

export default createBooking;