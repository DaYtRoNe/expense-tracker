import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with email already exists" });
        }

        const newUser = await User.create({
            username,
            email,
            password
        });

        const createdUser = await User.findById(newUser._id).select("-password");

        return res.status(201).json({ message: "User registered successfully", user: createdUser});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist"});
        }

        const isPasswordValid = await existingUser.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid user credentials" });
        }

        const accessToken = existingUser.generateAccessToken();

        const loggedInUser = await User.findById(existingUser._id).select("-password");

        return res.status(200).json({
            message: "User logged in successfully",
            user: loggedInUser,
            accessToken
        });
    } catch (error) {
        console.log("Error in loginUser:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export { registerUser, loginUser };