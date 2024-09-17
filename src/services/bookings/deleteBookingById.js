import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteBookingById = async (id) => {
    const primsa = new PrismaClient();

    const booking = await primsa.booking.deleteMany({
        where: { id: id }
    });

    if (booking.count <= 0) {
        throw new notFoundError("Booking", id);
    } else return id;
};

export default deleteBookingById;