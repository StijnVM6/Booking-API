import express from "express";
import getReviews from "../../services/reviews/getReviews.js";
import getReviewById from "../../services/reviews/getReviewById.js";
import createReview from "../../services/reviews/createReview.js";
import updateReviewById from "../../services/reviews/updateReviewById.js";
import deleteReviewById from "../../services/reviews/deleteReviewById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
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

router.post("/", async (req, res, next) => {
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

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            rating,
            comment,
            propertyId,
            userId
        } = req.body;

        await updateReviewById(
            id,
            rating,
            comment,
            propertyId,
            userId
        );

        res.status(200).json({ message: `Review with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", async (res, req, next) => {
    try {
        const { id } = req.params;
        await deleteReviewById(id);
        res.status(200).json({ message: `Review with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;