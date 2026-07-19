import jwt from "jsonwebtoken"

const genToken = async (userID) => {
    try {
        const token =await jwt.sign({ userID}, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log(token)
        return token
    }catch (error) {
        console.error("Error generating token:", error);

    }
}
export default genToken;