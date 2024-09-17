import { PrismaClient } from "@prisma/client";

const createUser = async (
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
) => {
    const primsa = new PrismaClient();

    const user = await primsa.user.create({
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