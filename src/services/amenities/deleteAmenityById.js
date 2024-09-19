import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteAmenityById = async (id) => {
    const prisma = new PrismaClient();

    const amenity = await prisma.amenity.deleteMany({
        where: { id: id }
    });

    if (amenity.count <= 0) {
        throw new NotFoundError("Amenity", id);
    } else return id;
};

export default deleteAmenityById;