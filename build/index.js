"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Se importa el modulo app
const app_1 = __importDefault(require("./app"));
//Se importa la función create connection de la base de datos
const db_1 = require("./db");
//Se indica el puerto en el que corrre el servidor
app_1.default.listen(app_1.default.get('port'));
//Se inicializa la base de datos
db_1.createConnection();
console.log("Server escuchando en el puerto 3000");
