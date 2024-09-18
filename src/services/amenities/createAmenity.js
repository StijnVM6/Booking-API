import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
    const primsa = new PrismaClient();

    const amenity = await primsa.amenity.create({
        data: { name: name }
    });

    return amenity;

    /*
    const check = await primsa.amenity.findFirst({
        where: { name: name }
    });

    if (check === null) {
        const amenity = await primsa.amenity.create({
            data: { name: name }
        });

        return amenity;
    } else { return null }
    */
};

export default createAmenity;