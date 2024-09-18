import { PrismaClient } from "@prisma/client";
// import getReviewById from "./getReviewById.js";

const updateReviewById = async (
    id,
    rating,
    comment,
    propertyId
) => {
    const primsa = new PrismaClient();

    /*
    // Check if review with id exists, returns 404 NotFoundError if not. 
    await getReviewById(id);

    // Checks if review with id has the active user as author.
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
    */

    const review = await primsa.review.updateMany({
        where: { id: id },
        data: {
            rating: rating,
            comment: comment,
            propertyId: propertyId
        }
    });

    if (!review) {
        throw new notFoundError("Review", id);
    } else return review;
};

export default updateReviewById;

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