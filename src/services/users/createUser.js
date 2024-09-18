import { PrismaClient } from "@prisma/client";

const createUser = async (
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
) => {
    const prisma = new PrismaClient();

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            profilePicture: profilePicture
        }
    });

    return user;
};

export default createUser;