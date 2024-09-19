import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getBookingById = async (id) => {
    const prisma = new PrismaClient();

    const booking = await prisma.booking.findUnique({
        where: { id: id }
    });

    if (!booking) {
        throw new NotFoundError("Booking", id);
    } else return booking;
};

export default getBookingById;