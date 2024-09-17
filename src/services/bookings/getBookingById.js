import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getBookingById = async (id) => {
    const primsa = new PrismaClient();

    const booking = await primsa.booking.findUnique({
        where: { id: id }
    });

    if (!booking) {
        throw new notFoundError("Booking", id);
    } else return booking;
};

export default getBookingById;