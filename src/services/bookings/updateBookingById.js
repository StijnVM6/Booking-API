import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

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
    const prisma = new PrismaClient();

    const booking = await prisma.booking.updateMany({
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

    if (booking.count <= 0) {
        throw new NotFoundError("Booking", id);
    } else return booking;
};

export default updateBookingById;