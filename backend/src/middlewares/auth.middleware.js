import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        // 1. Token එක හොයාගන්නවා (Header එකෙන් හෝ Cookie එකෙන්)
        // සාමාන්‍යයෙන් Front-end එකෙන් එවන්නේ "Bearer <token>" විදියට Authorization header එකේ.
        const token = req.header("Authorization")?.replace("Bearer ", "");

        // Token එක නැත්නම් Error එකක් යවනවා
        if (!token) {
            return res.status(401).json({ message: "Unauthorized request (Token missing)" });
        }

        // 2. Token එක Verify කරනවා (අපේ රහස් Secret එක පාවිච්චි කරලා)
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. Token එකේ තියෙන User ID එකෙන් User ව හොයාගන්නවා
        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        // 4. User ව Request object එකට අමුණනවා (Attach User to Request)
        // මේක හරිම වැදගත්. ඊළඟට එන Controller එකේදී අපිට req.user කියලා මේ User ව ගන්න පුළුවන් වෙන්නේ මේ නිසා.
        req.user = user;

        // 5. ඊළඟ පියවරට (Controller එකට) යන්න දෙනවා
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid Access Token", error: error.message });
    }
};