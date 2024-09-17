import { PrismaClient } from "@prisma/client";

const getReviews = async (
    rating,
    propertyId,
    userId
) => {
    const primsa = new PrismaClient();

    const reviews = await primsa.review.findMany({
        where: {
            rating: rating,
            propertyId: propertyId,
            userId: userId
        }
    });

    if (reviews.count <= 0) return null;
    else return reviews;
};

export default getReviews;