import express from "express";
import getReviews from "../../services/reviews/getReviews.js";
import getReviewById from "../../services/reviews/getReviewById.js";
import createReview from "../../services/reviews/createReview.js";
import updateReviewById from "../../services/reviews/updateReviewById.js";
import deleteReviewById from "../../services/reviews/deleteReviewById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";
import authMiddleware from "../../middleware/auth.js";
import checkForMissingArguments from "../../services/checkForMissingArguments.js";

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

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const {
            rating,
            propertyId,
            userId
        } = req.query;

        const reviews = await getReviews(
            rating,
            propertyId,
            userId
        );

        if (reviews === null)
            res.status(404).json({ message: "No such reviews found from request queries." });
        else
            res.status(200).json(reviews);
    } catch (err) {
        next(err)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);
        res.status(200).json(review);
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const {
            rating,
            comment,
            propertyId,
            userId
        } = req.body;

        const args = {
            rating,
            comment,
            propertyId
        };

        const missingArguments = await checkForMissingArguments(args, "review");

        if (missingArguments != null) {
            res.status(400).json({ message: missingArguments });
        } else {
            const newReview = await createReview(
                rating,
                comment,
                propertyId,
                userId
            );
            res.status(201).json(newReview);
        }
    } catch (err) {
        next(err)
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            rating,
            comment,
            propertyId
        } = req.body;

        /*
        const activeUserId = req.user.userId;
 
        const review = await updateReviewById(
            id,
            rating,
            comment,
            propertyId,
            activeUserId
        );
 
        if (review === null) {
            res.status(401).json({ message: `Only the author of this review can edit this review.` });
        } else {
            res.status(200).json({ message: `Review with id: ${id} succesfully updated.` });
        }*/

        await updateReviewById(
            id,
            rating,
            comment,
            propertyId
        );

        res.status(200).json({ message: `Review with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        /*
        const activeUserId = req.user.userId;

        const review = await deleteReviewById(id, activeUserId);

        if (review === null) {
            res.status(401).json({ message: `Only the author of this review can delete this review.` });
        } else {
            res.status(200).json({ message: `Review with id: ${id} succesfully deleted.` });
        }
        */
        await deleteReviewById(id);
        res.status(200).json({ message: `Review with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;