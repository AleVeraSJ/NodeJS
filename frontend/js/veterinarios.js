const listaVeterinarias = document.getElementById("lista-Veterinarias");
//const tipo = document.getElementById("pais");//
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/veterinarias";

let veterinarias = [];

async function listarVeterinarias(){

    try {
        const respuesta = await fetch(url);
        const veterinariasDelServer = await respuesta.json();
        if (Array.isArray(veterinariasDelServer)){
           veterinarias = veterinariasDelServer;
        }
        if (veterinarias.length>0){

        const htmlVeterinarias = veterinarias
        .map((Veterinaria, index)=>
            `<th scope="row">${index}</th>
            <td>${Veterinaria.nombre}</td>}
            <td>${Veterinaria.apellido}</td>
            <td>${Veterinaria.identificacion}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary editar"data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
            </td>
        </tr>`).join("");
        listaVeterinarias.innerHTML = htmlVeterinarias;
        Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
        Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));
        return;
    }
    listaVeterinarias.innerHTML =  `<tr>
            <td colspan= "5">No hay Veterinari@s</td>
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
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value
    };
    const accion = btnGuardar.value;
    let urlEnvio = url;
    let method = "POST"
    console.log("enviar datos", accion);


    if(accion === "Editar"){
            urlEnvio+=`/${indice.value}`;
            method = "PUT";
    }
    const respuesta = await fetch (urlEnvio,{
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify (datos),
        mode:"cors",
    });
        if (respuesta.ok){
            listarVeterinarias();
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
        let Veterinaria = veterinarias[index];
        nombre.value = Veterinaria.nombre;
        apellido.value = Veterinaria.apellido;
        indice.value = index;
        identificacion.value = Veterinaria.identificacion;
    }
}

function resetModal(){
    nombre.value = "";
    apellido.value = "";
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
                    listarVeterinarias();
                    resetModal();
                }
        
        }catch (error) {
            console.log({error});
            $(".alert").show();
        } 
    }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;