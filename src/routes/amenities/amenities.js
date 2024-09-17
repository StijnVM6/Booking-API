import express from "express";
import getAmenities from "../../services/amenities/getAmenities.js";
import getAmenityById from "../../services/amenities/getAmenityById.js";
import createAmenity from "../../services/amenities/createAmenity.js";
import updateAmenityById from "../../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../../services/amenities/deleteAmenityById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";

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
        const user = await getAmenityById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const newAmenity = await createAmenity(name);
        res.status(201).json(newAmenity);
    } catch (err) {
        next(err)
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await updateAmenityById(name);
        res.status(200).json({ message: `Amenity with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", async (res, req, next) => {
    try {
        const { id } = req.params;
        await deleteAmenityById(id);
        res.status(200).json({ message: `Amenity with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;