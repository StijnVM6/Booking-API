import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getPropertyById = async (id) => {
    const prisma = new PrismaClient();

    const property = await prisma.property.findUnique({
        where: { id: id }
    });

    if (!property) {
        throw new NotFoundError("Property", id);
    } else return property;
};

export default getPropertyById;