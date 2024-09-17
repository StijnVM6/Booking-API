import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteHostById = async (id) => {
    const primsa = new PrismaClient();

    const host = await primsa.host.deleteMany({
        where: { id: id }
    });

    if (host.count <= 0) {
        throw new notFoundError("Host", id);
    } else return id;
};

export default deleteHostById;