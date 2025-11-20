const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
            nullable: false,
        },
        email: {
            type: String,
            nullable: false,
            unique: true,
        },
        password: {
            type: String,
            nullable: false,
        },
        role: {
            type: String,
            nullable: false,
            default: "staff",
        },
        phone: {
            type: String,
            nullable: true,
        },
        city: {
            type: String,
            nullable: true,
        },
        country: {
            type: String,
            nullable: true,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
    },
});
