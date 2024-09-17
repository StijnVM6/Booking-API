import express from "express";
import getUsers from "../../services/users/getUsers.js";
import getUserById from "../../services/users/getUserById.js";
import createUser from "../../services/users/createUser.js";
import updateUserById from "../../services/users/updateUserById.js";
import deleteUserById from "../../services/users/deleteUserById.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await getUsers();
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

router.post("/", async (req, res, next) => {
    try {
        const {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture
        } = req.body;

        const newUser = await createUser(
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture
        );

        res.status(201).json(newUser);
    } catch (err) {
        next(err)
    }
});

router.put("/:id", async (req, res, next) => {
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

router.delete("/:id", async (res, req, next) => {
    try {
        const { id } = req.params;
        await deleteUserById(id);
        res.status(200).json({ message: `User with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;