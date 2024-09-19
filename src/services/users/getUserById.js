import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getUserById = async (id) => {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
        where: { id: id }
    });

    if (!user) {
        throw new NotFoundError("User", id);
    } else return user;
};

export default getUserById;