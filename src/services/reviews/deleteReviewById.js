import { PrismaClient } from "@prisma/client";
import getReviewById from "./getReviewById.js"

const deleteReviewById = async (id, activeUserId) => {
    const primsa = new PrismaClient();

    await getReviewById(id);

    const review = await primsa.review.deleteMany({
        where: { id: id, userId: activeUserId }
    });

    if (review.count <= 0) return null;
    else return id;
};

export default deleteReviewById;