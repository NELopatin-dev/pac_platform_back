const express = require("express");
const { default: AdminBro } = require("admin-bro");
const mongoose = require("mongoose");
const { config } = require("dotenv");

const options = require("./admin.options");
const buildAdminRouter = require("./admin.router");
const routers = require("../api/routes/index");

config();
const port = process.env.PORT || 5000;

const app = express();

const run = async () => {
    await mongoose.connect(process.env.DB_URL);

    const admin = new AdminBro(options);

    app.use(express.json());
    app.use("/api", routers);

    app.use(admin.options.rootPath, buildAdminRouter(admin));

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

module.exports = run;
