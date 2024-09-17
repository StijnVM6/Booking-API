import express from "express";
import getReviews from "../../services/reviews/getReviews.js";
import getReviewById from "../../services/reviews/getReviewById.js";
import createReview from "../../services/reviews/createReview.js";
import updateReviewById from "../../services/reviews/updateReviewById.js";
import deleteReviewById from "../../services/reviews/deleteReviewById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";
import authMiddleware from "../../middleware/auth.js";

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

        const newReview = await createReview(
            rating,
            comment,
            propertyId,
            userId
        );

        res.status(201).json(newReview);
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
        }

    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (res, req, next) => {
    try {
        const { id } = req.params;
        const activeUserId = req.user.userId;

        const review = await deleteReviewById(id, activeUserId);

        if (review === null) {
            res.status(401).json({ message: `Only the author of this review can delete this review.` });
        } else {
            res.status(200).json({ message: `Review with id: ${id} succesfully deleted.` });
        }
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;