"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Se importa la funcionalidad de Router de express
const express_1 = require("express");
//Se importan los controladores
const tasks_controller_1 = require("../controllers/tasks.controller");
//Se inicializa el router
const router = express_1.Router();
//Componentes usados por swagger para representar el tipo de dato que se almacena en la API, los mensajes de error y el parametro de la id
/**
 * @swagger
 * components:
 *  schemas:
 *      Task:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: El id autogenerado de las tareas
 *              name:
 *                  type: string
 *                  description: El nombre de la tarea
 *              description:
 *                  type: string
 *                  description: La descripción de la tarea
 *          required:
 *              - name
 *              - description
 *          example:
 *              id: K-WaCyt9f3BAS0Q6K6oxN
 *              name: Mi primera tarea
 *              description: Realizada con React
 *      TaskNotFound:
 *          type: object
 *          properties:
 *              msg:
 *                  type: string
 *                  description: Un mensaje de que no encuentra la tarea indicada
 *          example:
 *              msg: La tarea no fue encontrada.
 *  parameters:
 *      taskId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: La id de la tarea
 */
//Etiqueta para agrupar las rutas de la api
/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Endpoints de tareas
 */
//Descripción de swagger en format yaml para la ruta /tasks/
/**
 * @swagger
 * /tasks:
 *  get:
 *      summary: Retorna una lista de tareas
 *      tags: [Tasks]
 *      responses:
 *          200:
 *              description: La lista de tareas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Task'
 *
 *
 */
router.get('/tasks', tasks_controller_1.getTasks);
/**
 * @swagger
 * /tasks/count:
 *  get:
 *      summary: Retorna el total de tareas creadas
 *      tags: [Tasks]
 *      responses:
 *          200:
 *              description: El total de tareas
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: integer
 *                          example: 10
 */
router.get('/tasks/count', tasks_controller_1.count);
/**
 * @swagger
 * /tasks:
 *  post:
 *      summary: Crea una nueva tarea
 *      tags: [Tasks]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          200:
 *              description: La tarea se creo satisfactoriamente.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          500:
 *              description: Error del servidor.
 */
router.post('/tasks', tasks_controller_1.createTask);
/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      summary: Obtiene una tarea según la id
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/taskId'
 *      responses:
 *          200:
 *              description: La tarea fue encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: La tarea no fue encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/TaskNotFound'
 *
 */
router.get('/tasks/:id', tasks_controller_1.getTask);
/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *      summary: Borra una tarea según la id dada
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/taskId'
 *      responses:
 *          200:
 *              description: La tarea fue eliminada
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: La tarea no fue encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/TaskNotFound'
 */
router.delete('/tasks/:id', tasks_controller_1.deleteTask);
/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *      summary: Actualiza una tarea según la id dada
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/taskId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          200:
 *              description: La tarea fue actualizada
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: La tarea no fue encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/TaskNotFound'
 */
router.put('/tasks/:id', tasks_controller_1.updateTask);
//Se exporta el router creado
exports.default = router;
