require("dotenv").config();
const { DataSource } = require("typeorm");
const path = require("path");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: true,
    extra: {
        ssl: { rejectUnauthorized: false }
    },
    entities: [__dirname + "/entity/*.js"],
    migrations: [__dirname + "/migrations/*.js"],
    synchronize: false,
});

console.log("Entities loaded:", AppDataSource.options.entities);

module.exports = AppDataSource;
