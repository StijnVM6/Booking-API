import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deletePropertyById = async (id) => {
    const primsa = new PrismaClient();

    const property = await primsa.property.deleteMany({
        where: { id: id }
    });

    if (property.count <= 0) {
        throw new notFoundError("Property", id);
    } else return id;
};

export default deletePropertyById;