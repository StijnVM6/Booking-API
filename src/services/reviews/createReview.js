import { PrismaClient } from "@prisma/client";

const createReview = async (
    rating,
    comment,
    propertyId,
    userId
) => {
    const prisma = new PrismaClient();

    const review = await prisma.review.create({
        data: {
            rating: rating,
            comment: comment,
            propertyId: propertyId,
            userId: userId
        }
    });

    return review;
};

export default createReview;