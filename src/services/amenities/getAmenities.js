import { PrismaClient } from "@prisma/client";

const getAmenities = async (name) => {
    const primsa = new PrismaClient();
    const amenities = await primsa.amenity.findMany({
        where: { name: name }
    });

    if (amenities.count <= 0) return null;
    else return amenities;
};

export default getAmenities;