import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateUserById = async (
    id,
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
) => {
    const prisma = new PrismaClient();

    const user = await prisma.user.updateMany({
        where: { id: id },
        data: {
            username: username,
            password: password,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            profilePicture: profilePicture
        }
    });

    if (user.count <= 0) {
        throw new NotFoundError("User", id);
    } else return user;
};

export default updateUserById;