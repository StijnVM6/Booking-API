import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getHostById = async (id) => {
    const prisma = new PrismaClient();

    const host = await prisma.host.findUnique({
        where: { id: id }
    });

    if (!host) {
        throw new NotFoundError("Host", id);
    } else return host;
};

export default getHostById;