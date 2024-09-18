import express from "express";
import getHosts from "../../services/hosts/getHosts.js";
import getHostById from "../../services/hosts/getHostById.js";
import createHost from "../../services/hosts/createHost.js";
import updateHostById from "../../services/hosts/updateHostById.js";
import deleteHostById from "../../services/hosts/deleteHostById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const {
            username,
            name,
            email,
            phoneNumber
        } = req.query;

        const hosts = await getHosts(
            username,
            name,
            email,
            phoneNumber
        );

        if (hosts === null)
            res.status(404).json({ message: "No such hosts found from request queries." });
        else
            res.status(200).json(hosts);
    } catch (err) {
        next(err)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHostById(id);
        res.status(200).json(host);
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe
        } = req.body;

        const newHost = await createHost(
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe
        );

        res.status(201).json(newHost);
    } catch (err) {
        next(err)
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe
        } = req.body;

        await updateHostById(
            id,
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe
        );

        res.status(200).json({ message: `Host with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteHostById(id);
        res.status(200).json({ message: `Host with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;