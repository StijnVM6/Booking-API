import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    // console.log("token is: ", token);
    // console.log("req.header Authorization is : ", req.header("Authorization"));
    const secretKey = process.env.AUTH_SECRET_KEY;

    if (!token) {
        res.status(401).json({ message: `You are not authorized. Token missing.` })
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: `You are not authorized. Invalid token.` });
        }
        else {
            req.user = decoded;
            next();
        }
    });
};

export default authMiddleware;