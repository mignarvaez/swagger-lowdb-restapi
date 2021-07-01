//Se importa el componente handler de express que permite a las funciones de los controladores ser vistas por ts como handlers o manejadores de respuestas
import { Handler } from "express"
//Se importa la conexión a la base de datos
import { getConnection } from "../db"
//Función para generar un numero aleatorio para id
import { nanoid } from "nanoid";

//Se exporta la variable de tipo handler asociada al metodo getTasks
export const getTasks: Handler = (req, res) => {
    const data = getConnection().get('tasks').value();
    return res.json(data);
}

//Crea una nueva tarea
export const createTask: Handler = (req, res) => {

    const { name, description } = req.body;

    const newTask = {
        name,
        description,
        id: nanoid()
    };

    //Obtiene la conexión y el objeto o tipo de datos en donde se va a almcenar
    //la nueva tarea, en este caso el objeto se llama tasks y se agrega con push
    //la nueva tarea y con write se conforima
    try {
        getConnection().get('tasks').push(newTask).write();
    } catch (error) {
        //En caso de errror se envia el error como de tipo error del servidor
        res.status(500).send(error);
    }
    res.json(newTask);
}

//Obtiene una sola tarea
export const getTask: Handler = (req, res) => {

    //Se conecta a la base de datos, al objeto tasks y busca la tarea que tenga la id que llega por parametro
    const taskFound = getConnection().get('tasks').find({ id: req.params.id }).value();

    //Si no se encuentra la tarea con el id especificado se manda un error not found
    if (!taskFound) return res.status(404).json({ msg: 'La tarea no fue encontrada' });

    //En caso contrario se envia la tarea encontrada
    res.json(taskFound);

}

//Borra una tarea
export const deleteTask: Handler = (req, res) => {

    //Se conecta a la base de datos, al objeto tasks y busca la tarea que tenga la id que llega por parametro
    const taskFound = getConnection().get('tasks').find({ id: req.params.id }).value();

    //Si no se encuentra la tarea con el id especificado se manda un error not found
    if (!taskFound) return res.status(404).json({ msg: 'La tarea no fue encontrada' });

    //Se conecta a la base de datos, al objeto tasks y remueve la tarea que tenga la id que llega por parametro
    const deletedTask = getConnection().get('tasks').remove({ id: req.params.id }).write();

    res.json(deletedTask[0]);

}

//Actualiza una tarea segun id
export const updateTask: Handler = (req, res) => {

        //Se conecta a la base de datos, al objeto tasks y busca la tarea que tenga la id que llega por parametro
        const taskFound = getConnection().get('tasks').find({ id: req.params.id }).value();

        //Si no se encuentra la tarea con el id especificado se manda un error not found
        if (!taskFound) return res.status(404).json({ msg: 'La tarea no fue encontrada' });

        //Se actualiza la tarea encontrada asignandole lo que llega por el body
        const updatedTask = getConnection().get('tasks').find({ id: req.params.id }).assign(req.body).write();

        res.json(updatedTask);
}

//Cuenta las tareas 
export const count: Handler = (req, res) => {

    //Se conecta a la base de datos, busca el arreglo de tareas y retorna su longitud
    const taskLength = getConnection().get('tasks').value().length
    res.json(taskLength);
}
