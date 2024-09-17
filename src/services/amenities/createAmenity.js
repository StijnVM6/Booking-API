import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
    const primsa = new PrismaClient();

    const amenity = await primsa.amenity.create({
        data: { name: name }
    });

    return amenity;
};

export default createAmenity;