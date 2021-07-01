//Se importa el modulo app
import app from "./app";
//Se importa la función create connection de la base de datos
import {createConnection} from './db';

//Se indica el puerto en el que corrre el servidor
app.listen(app.get('port'));
//Se inicializa la base de datos
createConnection();

console.log("Server escuchando en el puerto 3000");