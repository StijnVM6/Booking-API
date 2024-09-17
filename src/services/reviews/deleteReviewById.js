import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteReviewById = async (id) => {
    const primsa = new PrismaClient();

    const review = await primsa.review.deleteMany({
        where: { id: id }
    });

    if (review.count <= 0) {
        throw new notFoundError("Review", id);
    } else return id;
};

export default deleteReviewById;