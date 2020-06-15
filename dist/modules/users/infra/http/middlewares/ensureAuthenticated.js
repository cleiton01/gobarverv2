"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
function ensureAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default(String(process.env.AUTH_MISS_TOKEN), Number(process.env.AUTH_MISS_TOKEN_STATUS));
    }
    // separa identificador "bearer" do token
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, String(process.env.APP_SECRECT));
        var sub = decoded.sub;
        request.user = {
            id: sub
        };
    }
    catch (err) {
        throw new AppError_1.default(String(process.env.AUTH_INVALID_TOKEN), Number(process.env.AUTH_INVALID_TOKEN_STATUS));
    }
    return next();
}
exports.default = ensureAuthenticated;
