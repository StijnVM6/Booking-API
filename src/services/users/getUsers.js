import { PrismaClient } from "@prisma/client";

const getUsers = async (
    username,
    name,
    email,
    phoneNumber
) => {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
        where: {
            username: username,
            name: name,
            email: email,
            phoneNumber: phoneNumber
        }
    });

    if (users.count <= 0) return null; // multiple users could potentially have the same name
    else return users;
};

export default getUsers;