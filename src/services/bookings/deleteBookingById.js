import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteBookingById = async (id) => {
    const prisma = new PrismaClient();

    const booking = await prisma.booking.deleteMany({
        where: { id: id }
    });

    if (booking.count <= 0) {
        throw new NotFoundError("Booking", id);
    } else return id;
};

export default deleteBookingById;