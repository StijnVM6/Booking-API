import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
    const primsa = new PrismaClient();
    return await primsa.property.findMany();
};

export default getProperties;