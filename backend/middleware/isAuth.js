import jwt from "jsonwebtoken"


const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User does not have a token" });
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "User does not have a valid token" });
        }
        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default isAuth;