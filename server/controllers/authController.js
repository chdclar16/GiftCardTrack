const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const { hashPassword, comparePasswords } = require("../helpers/auth");

// Handles Register
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Checks if username exists
        if (!username) {
            return res.status(400).json({
                error: "Username is required",
            });
        }

        // Checks if password is inputted
        if (!password || password.length < 5) {
            return res.status(400).json({
                error: "Invalid password, must be atleast 5 characters",
            });
        }

        // Checks if the username already exists in db
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.json(400).json({
                error: "Username already exists",
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // We create the user
        const user = await User.create({
            username,
            password: hashedPassword,
        });
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: `Error ${error}` });
    }
};

// Handles Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                error: "Username not found",
            });
        }

        // Check if passwords match
        const match = await comparePasswords(password, user.password);
        if (match) {
            jwt.sign(
                {
                    username: user.username,
                    id: user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                },
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(user);
                }
            );
        } else {
            return res.status(401).json({
                error: "Incorrect Password",
            });
        }
    } catch (err) {
        console.log({ "login error": err });
        res.status(404).json({
            error: "Unable to login"
        })
    }
};

// Logout
const logOut = (req, res) => {
    // Clear the token from cookies
    res.clearCookie('token');
    // Send a response to the client
    res.status(200).json({ message: "Logout Succcessful" })
};

// Get the profile
const getProfile = async (req, res) => {
    const { token } = req.cookies;
    // Checks if token exists
    if (token) {
        // We use jwt verify the token
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) {
                console.error({ "Profile Eror": err });
                res.status(401).json({ error: "Unauthorized" });
            } else {
                // Token is valid, send user data
                res.status(200).json(user);
            }
        });
    } else {
        // No token found cookies
        res.status(404).json(null);
    }
};


module.exports = {
    login,
    register,
    logOut,
    getProfile,
};
