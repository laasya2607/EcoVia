const express = require("express");
const router = express.Router();

const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER API
router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // Check if user already exists
        const existingUser = await db.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }


        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Insert user
        const result = await db.query(
            "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email",
            [name, email, hashedPassword]
        );


        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration failed"
        });

    }

});



// LOGIN API
router.post("/login", async (req, res) => {

    const { email, password } = req.body;


    try {

        // Find user
        const result = await db.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );


        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "User not found"
            });
        }


        const user = result.rows[0];


        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        // Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            "ecovia_secret_key",
            {
                expiresIn: "1h"
            }
        );


        res.json({

            message: "Login successful",

            token: token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });

    }

});


module.exports = router;