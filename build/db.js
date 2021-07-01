"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.createConnection = void 0;
//Se importa el modulo lowdb y En este caso se va a usar de manera sincrona.
const lowdb_1 = __importDefault(require("lowdb"));
//Se importa el adaptador que permitirá inicializar la base de datos
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
//Variable asociada a la base de datos de tipo lowdbsync y de tipo tareas
let db;
//Inicia la conexión con la base de datos y retorna la instancia asociada a la misma
const createConnection = () => {
    //Se crea un adaptador que tendrá la configuración de la base de datos, en este caso la información se almacenara en db.json
    const adapter = new FileSync_1.default('db.json');
    //Se crea la base de datos
    db = lowdb_1.default(adapter);
    //Se indica el tipo de de datos que almacenara la base de datos, en este caso un arreglo de tareas
    db.defaults({ tasks: [] }).write();
};
exports.createConnection = createConnection;
//Función que retorna la conexión a la base de datos
const getConnection = () => db;
exports.getConnection = getConnection;
