//Se importa el modulo lowdb y En este caso se va a usar de manera sincrona.
import lowdb from 'lowdb';
//Se importa el adaptador que permitirá inicializar la base de datos
import FileSync from 'lowdb/adapters/FileSync'

//Se crea un tipo de datos de tareas
type Task = {
    id: string,
    name: string,
    description: string
}

//Se crea un tipo de datos llamado schema que es un arreglo de tareas
type Scheme = {
    tasks: Task[]
}

//Variable asociada a la base de datos de tipo lowdbsync y de tipo tareas
let db:lowdb.LowdbSync<Scheme>;

//Inicia la conexión con la base de datos y retorna la instancia asociada a la misma
export const createConnection = () =>{
    //Se crea un adaptador que tendrá la configuración de la base de datos, en este caso la información se almacenara en db.json
    const adapter = new FileSync<Scheme>('db.json');
    //Se crea la base de datos
    db = lowdb(adapter);
    //Se indica el tipo de de datos que almacenara la base de datos, en este caso un arreglo de tareas
    db.defaults({tasks:[]}).write();
}

//Función que retorna la conexión a la base de datos
export const getConnection = () => db;