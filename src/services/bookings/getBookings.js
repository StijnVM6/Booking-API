import { PrismaClient } from "@prisma/client";

const getBookings = async (
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
    propertyId,
    userId
) => {
    const prisma = new PrismaClient();

    if (numberOfGuests) numberOfGuests = Number(numberOfGuests);
    if (totalPrice) totalPrice = Number.parseFloat(totalPrice);

    const bookings = await prisma.booking.findMany({
        where: {
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
            numberOfGuests: numberOfGuests,
            totalPrice: totalPrice,
            bookingStatus: bookingStatus,
            propertyId: propertyId,
            userId: userId
        }
    });

    if (bookings.count <= 0) return null;
    else return bookings;
};

export default getBookings;