const url = require ("url");
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require("./enrutador")

    //1.obtener la url desde el objeto request// ok
    module.exports = (req, res)=>{
        const urlActual = req.url;
        const urlParseada = url.parse(urlActual, true);
    
        //2.obtener la ruta//ok
        const ruta = urlParseada.pathname;
    
        //3. quitar slash
        let rutaLimpia = ruta.replace(/^\/+|\/+$/g,"");
    
        //3.1 obtener metodo http
        const metodo = req.method.toLowerCase();
        //3.1.1 dar permisos de cors
        
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Request-Methods", "OPTIONS, GET, PUT, DELETE, POST");


        //3.1.2 dar respuesta inmediata cuando el metodo sea options
        
        if (metodo === "options"){
            res.writeHead(200);
            res.end();
            return;
        }
    
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
             //3.4.3 revisar si tiene subrutas en este caso es el indice del array
    
             if(rutaLimpia.indexOf("/")>= -1){
                var [rutaPrincipal, indice] = rutaLimpia.split("/");
             }
    
             //3.5 ordenar la data del request
             let data = {
                 indice,
                 ruta: rutaLimpia,
                 query,
                 metodo,
                 headers,
                 payload: buffer,
             };
    
            
             console.log ({data});
    
             //3.6 elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene
             let handler;
             if (rutaPrincipal && enrutador [rutaPrincipal] && enrutador [rutaPrincipal][metodo.toLowerCase()] ){ // coercion de tipos
             handler = enrutador[rutaPrincipal][metodo.toLowerCase()];
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
    };