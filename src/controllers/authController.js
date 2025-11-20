const AppDataSource = require("../data-source");
const User = require("../entity/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password, role, phone, city, country } = req.body;

            if (!name || !email || !password)
                return res.status(400).json({ message: "Name, email, and password are required." });

            const repo = AppDataSource.getRepository("User");

            const exists = await repo.findOne({ where: { email } });
            if (exists) return res.status(400).json({ message: "Email already registered." });

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = repo.create({
                name,
                email,
                password: hashedPassword,
                role: role || "staff",
                phone,
                city,
                country
            });

            await repo.save(user);

            return res.status(201).json({ message: "User registered successfully." });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error." });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(400).json({ message: "Email and password required." });

            const repo = AppDataSource.getRepository("User");
            const user = await repo.findOne({ where: { email } });

            if (!user) return res.status(400).json({ message: "Invalid email or password." });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(400).json({ message: "Invalid email or password." });

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({
                message: "Login successful",
                token
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error." });
        }
    }
};
