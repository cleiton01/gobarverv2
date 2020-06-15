"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var UsersControllers_1 = __importDefault(require("@modules/users/infra/http/controllers/UsersControllers"));
var UserAvatarController_1 = __importDefault(require("@modules/users/infra/http/controllers/UserAvatarController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var userRouter = express_1.Router();
var upload = multer_1.default(upload_1.default);
var usersController = new UsersControllers_1.default();
var userAvatarController = new UserAvatarController_1.default();
userRouter.get('/', usersController.index);
userRouter.post('/', usersController.create);
userRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), userAvatarController.update);
userRouter.put('/:id', function (req, res) {
    return res.json({ message: "hola" });
});
userRouter.delete('/', function (req, res) {
    return res.json({ message: "hola" });
});
exports.default = userRouter;
