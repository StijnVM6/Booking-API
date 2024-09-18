import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteHostById = async (id) => {
    const prisma = new PrismaClient();

    const host = await prisma.host.deleteMany({
        where: { id: id }
    });

    if (host.count <= 0) {
        throw new notFoundError("Host", id);
    } else return id;
};

export default deleteHostById;