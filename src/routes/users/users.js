import express from "express";
import getUsers from "../../services/users/getUsers.js";
import getUserById from "../../services/users/getUserById.js";
import createUser from "../../services/users/createUser.js";
import updateUserById from "../../services/users/updateUserById.js";
import deleteUserById from "../../services/users/deleteUserById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";
import authMiddleware from "../../middleware/auth.js";
import checkForMissingArguments from "../../services/checkForMissingArguments.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const {
            username,
            name,
            email,
            phoneNumber
        } = req.query;

        const users = await getUsers(
            username,
            name,
            email,
            phoneNumber
        );

        if (users === null)
            res.status(404).json({ message: "No such users found from request queries." });
        else
            res.status(200).json(users);
    } catch (err) {
        next(err)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.status(200).json(user);
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
            profilePicture
        } = req.body;

        const args = {
            username,
            password,
            name,
            email,
            phoneNumber
        };

        const missingArguments = await checkForMissingArguments(args, "user");

        if (missingArguments != null) {
            res.status(400).json({ message: missingArguments });
        } else {
            const newUser = await createUser(
                username,
                password,
                name,
                email,
                phoneNumber,
                profilePicture
            );
            res.status(201).json(newUser);
        }
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
            profilePicture
        } = req.body;

        await updateUserById(
            id,
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture
        );

        res.status(200).json({ message: `User with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteUserById(id);
        res.status(200).json({ message: `User with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;