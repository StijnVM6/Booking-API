import { PrismaClient } from "@prisma/client";

const getUsers = async () => {
    const primsa = new PrismaClient();
    return await primsa.user.findMany();
};

export default getUsers;