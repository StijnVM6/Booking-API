import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

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
        throw new NotFoundError("Host", id);
    } else return host;
};

export default updateHostById;