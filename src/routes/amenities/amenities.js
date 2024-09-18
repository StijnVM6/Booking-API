import express from "express";
import getAmenities from "../../services/amenities/getAmenities.js";
import getAmenityById from "../../services/amenities/getAmenityById.js";
import createAmenity from "../../services/amenities/createAmenity.js";
import updateAmenityById from "../../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../../services/amenities/deleteAmenityById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";
import authMiddleware from "../../middleware/auth.js";
import checkForMissingArguments from "../../services/checkForMissingArguments.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query;
        const amenities = await getAmenities(name);

        if (amenities === null)
            res.status(404).json({ message: "No such amenities found from request queries." });
        else
            res.status(200).json(amenities);
    } catch (err) {
        next(err)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await getAmenityById(id);
        res.status(200).json(amenity);
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { name } = req.body;

        const args = { name };
        const missingArguments = await checkForMissingArguments(args, "amenity");

        if (missingArguments != null) {
            res.status(400).json({ message: missingArguments });
        } else {
            const newAmenity = await createAmenity(name);
            /*
            if (newAmenity === null) {
                res.status(200).json({ message: `Amenity with name: ${name} already exists. Request refused.` });
            } else {
                res.status(201).json(newAmenity);
            }
            */
            res.status(201).json(newAmenity);
        }
    } catch (err) {
        next(err)
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await updateAmenityById(id, name);
        res.status(200).json({ message: `Amenity with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteAmenityById(id);
        res.status(200).json({ message: `Amenity with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;