import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteUserById = async (id) => {
    const primsa = new PrismaClient();
    /*
    await getUserById(id);

    const updatedReviews = await primsa.review.updateMany({
        where: { userId: id },
        data: { userId: null }
    });
    if (updatedReviews.count <= 0) {
        console.log(`No reviews affected.`);
    } else console.log(`Updated reviews with userId ${id} to null.`);
    */
    const user = await primsa.user.deleteMany({
        where: { id: id }
    });

    if (user.count <= 0) {
        throw new NotFoundError("User", id);
    } else return id;
};

export default deleteUserById;