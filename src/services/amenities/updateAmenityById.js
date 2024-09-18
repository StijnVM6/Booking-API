import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updateAmenityById = async (id, name) => {
    const prisma = new PrismaClient();

    const amenity = await prisma.amenity.updateMany({
        where: { id: id },
        data: { name: name }
    });

    if (amenity.count <= 0) {
        throw new notFoundError("Amenity", id);
    } else return amenity;
};

export default updateAmenityById;