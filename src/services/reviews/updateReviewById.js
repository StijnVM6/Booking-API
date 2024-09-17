import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updateReviewById = async (
    rating,
    comment,
    propertyId,
    userId
) => {
    const primsa = new PrismaClient();

    const review = await primsa.review.updateMany({
        where: { id: id },
        data: {
            rating: rating,
            comment: comment,
            propertyId: propertyId,
            userId: userId
        }
    });

    if (!review) {
        throw new notFoundError("Review", id);
    } else return review;
};

export default updateReviewById;