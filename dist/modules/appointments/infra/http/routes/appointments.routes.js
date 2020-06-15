"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var AppointmetsController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/AppointmetsController"));
var appintmentsRouter = express_1.Router();
var appoitmentController = new AppointmetsController_1.default();
appintmentsRouter.use(ensureAuthenticated_1.default);
appintmentsRouter.get('/', appoitmentController.find);
appintmentsRouter.post('/', appoitmentController.create);
appintmentsRouter.put('/:id', function (req, res) {
    return res.json({ message: "hola" });
});
appintmentsRouter.delete('/', function (req, res) {
    return res.json({ message: "hola" });
});
exports.default = appintmentsRouter;
