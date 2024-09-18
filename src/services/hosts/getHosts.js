import { PrismaClient } from "@prisma/client";

const getHosts = async (
    username,
    name,
    email,
    phoneNumber
) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.findMany({
        where: {
            username: username,
            name: name,
            email: email,
            phoneNumber: phoneNumber
        }
    });

    if (host.count <= 0) return null; // multiple hosts could potentially have the same name
    else return host;
};

export default getHosts;