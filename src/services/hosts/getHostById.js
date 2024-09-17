import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getHostById = async (id) => {
    const primsa = new PrismaClient();

    const host = await primsa.host.findUnique({
        where: { id: id }
    });

    if (!host) {
        throw new notFoundError("Host", id);
    } else return host;
};

export default getHostById;