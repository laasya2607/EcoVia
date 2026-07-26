const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/auth");
const routeRoutes= require("./routes/routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/routes",routeRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("EcoVia Backend Running Successfully!");
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`EcoVia server running on port ${PORT}`);
});