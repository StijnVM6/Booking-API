import express from "express";
import getProperties from "../../services/properties/getProperties.js";
import getPropertyById from "../../services/properties/getPropertyById.js";
import createProperty from "../../services/properties/createProperty.js";
import updatePropertyById from "../../services/properties/updatePropertyById.js";
import deletePropertyById from "../../services/properties/deletePropertyById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const properties = await getProperties();
        res.status(200).json(properties);
    } catch (err) {
        next(err)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getPropertyById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.post("/", async (req, res, next) => {
    try {
        const {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            hostId
        } = req.body;

        const newProperty = await createProperty(
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            hostId
        );

        res.status(201).json(newProperty);
    } catch (err) {
        next(err)
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            hostId
        } = req.body;

        await updatePropertyById(
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            hostId
        );

        res.status(200).json({ message: `Property with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", async (res, req, next) => {
    try {
        const { id } = req.params;
        await deletePropertyById(id);
        res.status(200).json({ message: `Property with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;