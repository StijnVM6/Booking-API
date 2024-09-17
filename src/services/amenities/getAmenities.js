import { PrismaClient } from "@prisma/client";

const getAmenities = async () => {
    const primsa = new PrismaClient();
    return await primsa.amenity.findMany();
};

export default getAmenities;