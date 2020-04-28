"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (request, response) {
    return response.json({ message: "hello " + process.env.APP_PORT });
});
app.listen(3333, function () {
    console.log("servidor iniciado na porta " + process.env.APP_PORT);
});
