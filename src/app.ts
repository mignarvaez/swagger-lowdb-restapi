//Se importa express, cors, morgan(para ver adecuadamente los logs de peticiones http)
import express from 'express'
import cors from 'cors'
import morgan from 'morgan';

//Se importan los modulos de swagger
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from './swaggerOptions';

//Se importan las rutas
import taskRoutes from './routes/tasks.routes';

//Se inicializa express
const app = express();

//Se especifica el puerto en el que escucha el servidor, primero buscará si está definido en una variable de entorno, en caso contrario usará el puerto 3000
app.set('port', process.env.PORT || 3000); 

//Se le indica al servidor que use cors para gestionar peticiones cross-origin
app.use(cors());

//Se le indica que use morgan en modo dev para ver las peticiones que llegan
app.use(morgan('dev'));

//Se le indica que use o interprete los datos  que llegan al servidor en formato json
app.use(express.json());

//Se inicializa swaggerJsDoc con las opciones de configuración establecidas
const specs = swaggerJsDoc(options);

//Se indica que use las rutas definidas
app.use(taskRoutes);

//Se indica la ruta asociada a la documentación con swagger de la API usando swaggerUI.serve y swaggerUI.setup
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

//Se exporta express
export default app;