import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getReviewById = async (id) => {
    const prisma = new PrismaClient();


    console.log("----------------------------------");
    console.log("----------------------------------");
    console.log("id is: ", id);

    console.log("----------------------------------");
    console.log("----------------------------------");

    const review = await prisma.review.findUnique({
        where: { id: id }
    });

    if (!review) {
        throw new notFoundError("Review", id);
    } else return review;
};

export default getReviewById;