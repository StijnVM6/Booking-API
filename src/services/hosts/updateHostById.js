import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updateHostById = async (
    id,
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe
) => {
    const prisma = new PrismaClient();

    const host = await prisma.host.updateMany({
        where: { id: id },
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

    if (host.count <= 0) {
        throw new notFoundError("Host", id);
    } else return host;
};

export default updateHostById;