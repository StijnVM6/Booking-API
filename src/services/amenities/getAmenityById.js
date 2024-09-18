import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getAmenityById = async (id) => {
    const prisma = new PrismaClient();

    const amenity = await prisma.amenity.findUnique({
        where: { id: id }
    });

    if (!amenity) {
        throw new notFoundError("Amenity", id);
    } else return amenity;
};

export default getAmenityById;