import express from "express";
import login from "../../services/auth/login.js";
import checkForMissingArguments from "../../services/checkForMissingArguments.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const args = {
            username,
            password
        };

        const missingArguments = await checkForMissingArguments(args, "login");

        if (missingArguments != null) {
            res.status(400).json({ message: missingArguments });
        } else {
            const token = await login(username, password);
            const tokenObject = { token: token }; // boilerplate test suite seems to need the token returned in an object.

            if (!token) {
                res.status(401).json({ message: `Incorrect login credentials.` });
            } else {
                // res.status(200).json({ message: `Succesful login, token created: ${token}` });
                res.status(200).json(tokenObject); // return the object instead of string. 
            }
        }
    } catch (err) {
        next(err);
    }
});

export default router;