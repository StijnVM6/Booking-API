import { PrismaClient } from "@prisma/client";

const createHost = async (
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe
) => {
    const prisma = new PrismaClient();

    const host = await prisma.host.create({
        data: {
            username: username,
            password: password,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            profilePicture: profilePicture,
            aboutMe: aboutMe
        }
    });

    return host;
};

export default createHost;