import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updateAmenityById = async (id, name) => {
    const primsa = new PrismaClient();

    const amenity = await primsa.amenity.updateMany({
        where: { id: id },
        data: { name: name }
    });

    if (!amenity) {
        throw new notFoundError("Amenity", id);
    } else return amenity;
};

export default updateAmenityById;