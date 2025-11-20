const express = require("express");
const cors = require("cors");
const AppDataSource = require("./data-source");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
