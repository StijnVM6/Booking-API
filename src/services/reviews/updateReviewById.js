import { PrismaClient } from "@prisma/client";
import getReviewById from "./getReviewById.js";

const updateReviewById = async (
    id,
    rating,
    comment,
    propertyId,
    activeUserId
) => {
    const primsa = new PrismaClient();

    await getReviewById(id);

    const review = await primsa.review.updateMany({
        where: { id: id, userId: activeUserId },
        data: {
            rating: rating,
            comment: comment,
            propertyId: propertyId
        }
    });

    if (review.count <= 0) return null;
    else return review;
};

export default updateReviewById;