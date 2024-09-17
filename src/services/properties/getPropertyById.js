import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getPropertyById = async (id) => {
    const primsa = new PrismaClient();

    const property = await primsa.property.findUnique({
        where: { id: id }
    });

    if (!property) {
        throw new notFoundError("Property", id);
    } else return property;
};

export default getPropertyById;