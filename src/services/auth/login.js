import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const login = async (username, password) => {
    const prisma = new PrismaClient();
    const secretKey = process.env.AUTH_SECRET_KEY;
    const user = await prisma.user.findFirst({
        where: {
            username: username, password: password
        }
    });

    if (!user) {
        return null;
    } else {
        const token = jwt.sign({ userId: user.id }, secretKey);
        return token;
    }
}

export default login;
