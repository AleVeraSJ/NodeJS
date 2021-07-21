const listaDuenos = document.getElementById("lista-duenos");
const tipo = document.getElementById("pais");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/duenos"

let duenos = [];

async function listarDuenos(){
    
    try {
        const respuesta = await fetch (url);
        const duenosDelServer = await respuesta.json();
        if (Array.isArray(duenosDelServer)){
            duenos = duenosDelServer;
        }
        if (duenos.length >0 ){
        const htmlDuenos = duenos
        .map((dueno, index)=>
            `<th scope="row">${index}</th>
            <td>${dueno.tipo}</td>
            <td>${dueno.nombre}</td>}
            <td>${dueno.apellido}</td>
            <td>${dueno.identificacion}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary editar"data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
            </td>
        </tr>`).join("");
        listaDuenos.innerHTML = htmlDuenos;
        Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
        Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));
        return;
    }
    listaDuenos.innerHTML = `<tr>
        <td colspan= "5">No hay dueños</td>
        </td>
    </tr>`;
    } catch (error) {
    console.log({error});
    $(".alert").show();
    }
};

async function enviarDatos(evento){
    evento.preventDefault();
try {
    const datos= {
        tipo: tipo.value,
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value
    };
    let method = "POST";
    let urlEnvio = url;
    const accion = btnGuardar.value;
    console.log("enviar datos", accion);
    if(accion === "Editar"){
            method = "PUT";
            duenos[indice.value]=datos;
            urlEnvio = `${url}/${indice.value}`
    }
const respuesta = await fetch (urlEnvio,{
    method,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify (datos),
});
        if (respuesta.ok){
            listarDuenos();
            resetModal();
        }
    } catch (error) {
    console.log({error});
    $(".alert").show();
    };

};


function editar(index){
    return function cuandoClickeo(){
        btnGuardar.value = "Editar"
        let dueno = duenos[index];
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        tipo.value = dueno.tipo;
        indice.value = index;
        identificacion.value = dueno.identificacion;
    }
}

function resetModal(){
    nombre.value = "";
    apellido.value = "";
    tipo.value = "";
    indice.value = "";
    identificacion.value = "";
    btnGuardar.value="Guardar"
}

function eliminar(index){
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar(){
        try {
            const respuesta = await fetch (urlEnvio,{
                method: "DELETE",
            });
                if (respuesta.ok){
                    listarDuenos();
                    resetModal();
                }
        
        }catch (error) {
            console.log({error});
            $(".alert").show();
        } 
    }
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;