import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updateUserById = async (
    id,
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
) => {
    const primsa = new PrismaClient();

    const user = await primsa.user.updateMany({
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

    if (!user) {
        throw new notFoundError("User", id);
    } else return user;
};

export default updateUserById;