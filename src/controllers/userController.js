const AppDataSource = require("../data-source");

module.exports = {
    listUsers: async (req, res) => {
        try {
            const repo = AppDataSource.getRepository("User");

            const { search, country } = req.query;

            let query = repo.createQueryBuilder("user");

            if (search) {
                query = query.andWhere(
                    "user.name ILIKE :search OR user.email ILIKE :search",
                    { search: `%${search}%` }
                );
            }

            if (country) {
                query = query.andWhere("user.country ILIKE :country", {
                    country: `%${country}%`
                });
            }

            const users = await query.getMany();

            return res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    },

    getUserDetails: async (req, res) => {
        try {
            const repo = AppDataSource.getRepository("User");
            const userId = parseInt(req.params.id, 10);

            if (req.user.role !== "admin" && req.user.id !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            const user = await repo.findOne({ where: { id: userId } });

            if (!user) return res.status(404).json({ message: "User not found" });

            return res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
};
