import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./Model.js";
import TryCatch from "./TryCatch.js"
import { AuthenticateRequest } from "./middleware.js";

export const registerUser = TryCatch(async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        res.status(400).json({ message: "User Already exists" });
        return;
    }


    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({
        name,
        email,
        password: hashed
    });

    const token = jwt.sign({ _id: user._id }, process.env.Jwt as string, {
        expiresIn: "3D",
    });

    res.status(201).json({
        message: "User Registered",
        user,
        token,
    })

});


export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({ message: "User Not Found" });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400).json({ message: "Incorrect Password" });
        return;
    }

    const token = jwt.sign({ _id: user._id }, process.env.Jwt as string, {
        expiresIn: "3D",
    });


    res.status(201).json({
        message: "Logging Succesfull",
        token,
        user,

    })

});

export const userProfile = TryCatch(async (req: AuthenticateRequest, res) => {
    const user = req.user

    res.json(user);
})
