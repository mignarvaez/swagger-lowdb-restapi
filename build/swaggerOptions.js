"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
//Archivo que contiene las opciones de configuración de swagger
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Tasks API',
            version: '1.0.0',
            description: 'Una API simple de express'
        },
        servers: [
            {
                url: "http://localhost:3000" //donde esta nuestra api
            }
        ]
    },
    apis: ["./src/routes/*.ts"] //Lugar donde se encuentra la documentacion
};
