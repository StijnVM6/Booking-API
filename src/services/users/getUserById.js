import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getUserById = async (id) => {
    const primsa = new PrismaClient();

    const user = await primsa.user.findUnique({
        where: { id: id }
    });

    if (!user) {
        throw new notFoundError("User", id);
    } else return user;
};

export default getUserById;