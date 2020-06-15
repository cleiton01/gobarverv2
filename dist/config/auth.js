"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    jwt: {
        secrect: process.env.APP_SECRECT,
        expiresIn: process.env.APP_SESSION_EXPIRESIN,
    },
};
