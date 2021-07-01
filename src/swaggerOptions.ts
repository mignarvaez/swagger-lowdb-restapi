//Archivo que contiene las opciones de configuración de swagger
export const options = {
    definition:{
        openapi: "3.0.0", //Estandar openapi 3.0 
        info:{ 
            title: 'Tasks API', //titulo de la documentacion
            version: '1.0.0',
            description: 'Una API simple de express'
        },
        servers: [ //Desde donde va a servir y testear la documentacion y la api
            {
                url: "http://localhost:3000" //donde esta nuestra api
            }
        ]
    },
    apis:["./src/routes/*.ts"] //Lugar donde se encuentra la documentacion
}