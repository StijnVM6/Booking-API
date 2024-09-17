import { PrismaClient } from "@prisma/client";

const getBookings = async () => {
    const primsa = new PrismaClient();
    return await primsa.booking.findMany();
};

export default getBookings;