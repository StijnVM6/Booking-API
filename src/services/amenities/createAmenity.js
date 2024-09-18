import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
    const prisma = new PrismaClient();

    const amenity = await prisma.amenity.create({
        data: { name: name }
    });

    return amenity;

    /*
    const check = await prisma.amenity.findFirst({
        where: { name: name }
    });

    if (check === null) {
        const amenity = await prisma.amenity.create({
            data: { name: name }
        });

        return amenity;
    } else { return null }
    */
};

export default createAmenity;