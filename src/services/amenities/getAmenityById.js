import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getAmenityById = async (id) => {
    const primsa = new PrismaClient();

    const amenity = await primsa.amenity.findUnique({
        where: { id: id }
    });

    if (!amenity) {
        throw new notFoundError("Amenity", id);
    } else return amenity;
};

export default getAmenityById;