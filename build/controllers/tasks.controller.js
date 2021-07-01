"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.updateTask = exports.deleteTask = exports.getTask = exports.createTask = exports.getTasks = void 0;
//Se importa la conexión a la base de datos
const db_1 = require("../db");
//Función para generar un numero aleatorio para id
const nanoid_1 = require("nanoid");
//Se exporta la variable de tipo handler asociada al metodo getTasks
const getTasks = (req, res) => {
    const data = db_1.getConnection().get('tasks').value();
    return res.json(data);
};
exports.getTasks = getTasks;
//Crea una nueva tarea
const createTask = (req, res) => {
    const { name, description } = req.body;
    const newTask = {
        name,
        description,
        id: nanoid_1.nanoid()
    };
    //Obtiene la conexión y el objeto o tipo de datos en donde se va a almcenar
    //la nueva tarea, en este caso el objeto se llama tasks y se agrega con push
    //la nueva tarea y con write se conforima
    try {
        db_1.getConnection().get('tasks').push(newTask).write();
    }
    catch (error) {
        //En caso de errror se envia el error como de tipo error del servidor
        res.status(500).send(error);
    }
    res.json(newTask);
};
exports.createTask = createTask;
//Obtiene una sola tarea
const getTask = (req, res) => {
    //Se conecta a la base de datos, al objeto tasks y busca la tarea que tenga la id que llega por parametro
    const taskFound = db_1.getConnection().get('tasks').find({ id: req.params.id }).value();
    //Si no se encuentra la tarea con el id especificado se manda un error not found
    if (!taskFound)
        return res.status(404).json({ msg: 'La tarea no fue encontrada' });
    //En caso contrario se envia la tarea encontrada
    res.json(taskFound);
};
exports.getTask = getTask;
//Borra una tarea
const deleteTask = (req, res) => {
    //Se conecta a la base de datos, al objeto tasks y busca la tarea que tenga la id que llega por parametro
    const taskFound = db_1.getConnection().get('tasks').find({ id: req.params.id }).value();
    //Si no se encuentra la tarea con el id especificado se manda un error not found
    if (!taskFound)
        return res.status(404).json({ msg: 'La tarea no fue encontrada' });
    //Se conecta a la base de datos, al objeto tasks y remueve la tarea que tenga la id que llega por parametro
    const deletedTask = db_1.getConnection().get('tasks').remove({ id: req.params.id }).write();
    res.json(deletedTask[0]);
};
exports.deleteTask = deleteTask;
//Actualiza una tarea segun id
const updateTask = (req, res) => {
    //Se conecta a la base de datos, al objeto tasks y busca la tarea que tenga la id que llega por parametro
    const taskFound = db_1.getConnection().get('tasks').find({ id: req.params.id }).value();
    //Si no se encuentra la tarea con el id especificado se manda un error not found
    if (!taskFound)
        return res.status(404).json({ msg: 'La tarea no fue encontrada' });
    //Se actualiza la tarea encontrada asignandole lo que llega por el body
    const updatedTask = db_1.getConnection().get('tasks').find({ id: req.params.id }).assign(req.body).write();
    res.json(updatedTask);
};
exports.updateTask = updateTask;
//Cuenta las tareas 
const count = (req, res) => {
    //Se conecta a la base de datos, busca el arreglo de tareas y retorna su longitud
    const taskLength = db_1.getConnection().get('tasks').value().length;
    res.json(taskLength);
};
exports.count = count;
