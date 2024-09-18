import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteAmenityById = async (id) => {
    const prisma = new PrismaClient();

    const amenity = await prisma.amenity.deleteMany({
        where: { id: id }
    });

    if (amenity.count <= 0) {
        throw new notFoundError("Amenity", id);
    } else return id;
};

export default deleteAmenityById;