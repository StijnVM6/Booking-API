import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
    const primsa = new PrismaClient();
    return await primsa.review.findMany();
};

export default getReviews;