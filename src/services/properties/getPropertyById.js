import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getPropertyById = async (id) => {
    const prisma = new PrismaClient();

    const property = await prisma.property.findUnique({
        where: { id: id }
    });

    if (!property) {
        throw new notFoundError("Property", id);
    } else return property;
};

export default getPropertyById;