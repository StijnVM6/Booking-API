import { PrismaClient } from "@prisma/client";

const getHosts = async () => {
    const primsa = new PrismaClient();
    return await primsa.host.findMany();
};

export default getHosts;