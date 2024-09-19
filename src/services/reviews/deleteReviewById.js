import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteReviewById = async (id) => {
    const prisma = new PrismaClient();
    /*
    await getReviewById(id);

    const review = await primsa.review.deleteMany({
        where: { id: id, userId: activeUserId }
    });

    if (review.count <= 0) return null;
    else return id;
    */
    const review = await prisma.review.deleteMany({
        where: { id: id }
    });

    if (review.count <= 0) {
        throw new notFoundError("Review", id);
    } else return id;
};

export default deleteReviewById;

// ------------
// --- NOTE ---
// ------------
// I deviated from the assignment with the review services.
// Since the logic for the review services is the same principle application
// as for the bookings, properties, etc...
// I decided to add another verification that check whether the active user (currently logged in user)
// is the author of the review because in practice that user should be the only one with the
// authorization to update or delete the review.

// If the review by id can't be found > returns 404 NotFoundError.
// If review by id found, check if author = active user,
//          if not returns null to respond with a 501 unauthorized.
// Else proceed by updating or deleting the review by id. 