import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteUserById = async (id) => {
    const primsa = new PrismaClient();

    const user = await primsa.user.deleteMany({
        where: { id: id }
    });

    if (user.count <= 0) {
        throw new notFoundError("User", id);
    } else return id;
};

export default deleteUserById;