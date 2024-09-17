import express from "express";
import login from "../../services/auth/login.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        if (!token) {
            res.status(401).json({ message: `Incorrect login credentials.` });
        } else {
            res.status(200).json({ message: `Succesful login, token created: ${token}` });
        }
    } catch (err) {
        next(err);
    }
});

export default router;