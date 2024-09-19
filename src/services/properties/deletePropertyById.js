import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deletePropertyById = async (id) => {
    const prisma = new PrismaClient();

    const property = await prisma.property.deleteMany({
        where: { id: id }
    });

    if (property.count <= 0) {
        throw new NotFoundError("Property", id);
    } else return id;
};

export default deletePropertyById;