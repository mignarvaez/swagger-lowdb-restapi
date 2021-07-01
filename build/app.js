"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Se importa express, cors, morgan(para ver adecuadamente los logs de peticiones http)
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//Se importan los modulos de swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = require("./swaggerOptions");
//Se importan las rutas
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
//Se inicializa express
const app = express_1.default();
//Se especifica el puerto en el que escucha el servidor, primero buscará si está definido en una variable de entorno, en caso contrario usará el puerto 3000
app.set('port', process.env.PORT || 3000);
//Se le indica al servidor que use cors para gestionar peticiones cross-origin
app.use(cors_1.default());
//Se le indica que use morgan en modo dev para ver las peticiones que llegan
app.use(morgan_1.default('dev'));
//Se le indica que use o interprete los datos  que llegan al servidor en formato json
app.use(express_1.default.json());
//Se inicializa swaggerJsDoc con las opciones de configuración establecidas
const specs = swagger_jsdoc_1.default(swaggerOptions_1.options);
//Se indica que use las rutas definidas
app.use(tasks_routes_1.default);
//Se indica la ruta asociada a la documentación con swagger de la API usando swaggerUI.serve y swaggerUI.setup
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
//Se exporta express
exports.default = app;
