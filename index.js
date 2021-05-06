const http = require("http");
const url = require ("url");
const StringDecoder = require('string_decoder').StringDecoder;


let recursos = {
    mascotas: [
        {tipo:"perro", nombre: "Rocco", dueño:"Ale" },
        {tipo:"perro", nombre: "Rocco", dueño:"Ale" },
        {tipo:"perro", nombre: "Rocco", dueño:"Ale" },
        {tipo:"perro", nombre: "Rocco", dueño:"Ale" }
    ],
};

    //1.obtener la url desde el objeto request// ok
const server = http.createServer((req, res)=>{
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    //2.obtener la ruta//ok
    const ruta = urlParseada.pathname;

    //3. quitar slash
    let rutaLimpia = ruta.replace(/^\/+|\/+$/g,"");

    //3.1 obtener metodo http
    const metodo = req.method;

    //3.2 obtener variables de query url
    const { query = {}} = urlParseada;

    //3.3 obtener headers
    const { headers = {} } = req;

    //3.4 obtener payload, en el caso de haber uno
    const decoder = new StringDecoder("utf-8");
    let buffer ="";



    //3.4.1 ir acumulando la data cuando el request reciba un payload
    req.on("data", (data)=>{
        buffer += decoder.write(data);
    });

    //3.4.2 terminar de acumular datos y decirle al decoder que finalice
    req.on("end", ()=>{
         buffer += decoder.end();

         if (headers['content-type'] === 'application/json'){
            buffer = JSON.parse(buffer);
         }


         //3.5 ordenar la data del request
         let data = {
             ruta: rutaLimpia,
             query,
             metodo,
             headers,
             payload: buffer,
         };

         console.log ({data});

         //3.6 elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene
         let handler;
         if (rutaLimpia && enrutador [rutaLimpia] && enrutador [rutaLimpia][metodo.toLowerCase()] ){ // coercion de tipos
             handler = enrutador[rutaLimpia][metodo];
         } else {
             handler = enrutador.noEncontrado; 
         };

           //4. ejecutar handler para enviar la respuesta
           if (typeof handler === 'function' ){
            handler(data, (statusCode = 200, mensaje)=>{
               let respuesta = JSON.stringify(mensaje);
               res.setHeader("Content-Type", "application/json");
               res.writeHead(statusCode);

               //linea donde realmente ya estamos respondiendo a la aplicacion cliente 
               res.end(respuesta);
               });
            }
    });
});
const enrutador = {
    ruta: (data, callback) =>{
        callback(200, {mensaje: "esta es /ruta"});
    },
    /*usuarios: (data, callback) =>{
        callback(200, [{nombre: "usuario 2"}, {nombre: "usuario 1"}]);
    },*/

    mascotas:{
        get: (data, callback) =>{
            callback(200,recursos.mascotas);
        },
        post: (data, callback) =>{
            recursos.mascotas.push(data.payload);
            callback(201, data.payload);
        },
    },

    noEncontrado: (data, callback) =>{
        callback(404, {mensaje: "no encontrado"});
    }
};
server.listen(5000,()=>{
    console.log("el servidor esta escuchando peticiones en http://localhost:5000/");
});