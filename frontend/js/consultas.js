const listaConsultas = document.getElementById ("lista-consultas");
const mascota = document.getElementById ("tipo");
const veterinario = document.getElementById("veterinario");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const btnGuardar = document.getElementById("btn-guardar");
const indice = document.getElementById("indice");


let consultas = [];
let mascotas = [];
let veterinarios = [];
const url = "http://localhost:5000";

async function listarConsultas() {
    const entidad = "consultas";
    try {
        const respuesta = await fetch (`${url}/${entidad}`);
        const consultasDelServer = await respuesta.json();
        if(Array.isArray(consultasDelServer)){
        consultas = consultasDelServer;
        }
        if (respuesta.ok){
            const htmlConsultas = consultas.map(
                (consulta, indice) =>
                `<tr>
                    <th scope="row">${indice}</th>
                    <td>${consulta.mascota.nombre}</td>
                    <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellido}</td>
                    <td>${consulta.diagnostico}</td>
                    <td>${consulta.fechaCreacion}</td>
                    <td>${consulta.fechaEdicion}</td>
                    <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary editar"data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="far fa-edit"></i></button>
                    </div>
                    </td>
                    </tr>
                <tr>`
             )
             .join("");
             listaConsultas.innerHTML = htmlConsultas;
             Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
            
        }



    } catch (error) {
        throw error;
    }
}

async function listarMascotas() {
    const entidad = "mascotas";
    try {
        const respuesta = await fetch (`${url}/${entidad}`);
        const mascotasDelServer = await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
        mascotas = mascotasDelServer;
        }
        if (respuesta.ok){
            const htmlMascotas = mascotas.forEach(
                (_mascota, indice) =>{
                    const optionActual = document.createElement("option");
                    optionActual.innerHTML = _mascota.nombre;
                    optionActual.value = indice;
                    mascota.appendChild(optionActual);
                });
        }
    } catch (error) {
        throw error;
    }
}


async function listarVeterinarios() {
    const entidad = "veterinarias";
    try {
        const respuesta = await fetch (`${url}/${entidad}`);
        const veterinariosDelServer = await respuesta.json();
        if(Array.isArray(veterinariosDelServer)){
        veterinarios = veterinariosDelServer;
        }
        if (respuesta.ok){
             veterinarios.forEach(
                (_veterinario, indice) =>{
                    const optionActual = document.createElement("option");
                    optionActual.innerHTML =`${_veterinario.nombre} ${_veterinario.apellido} `;
                    optionActual.value = indice;
                    veterinario.appendChild(optionActual);
                });
        }
    } catch (error) {
        throw error;
    }
}


async function enviarDatos(evento){
    const entidad = "consultas";
    evento.preventDefault();
try {
    const datos= {
        mascota: mascota.value,
        veterinaria: veterinario.value,
        historia: historia.value,
        diagnostico: diagnostico.value,

    };
    
    const accion = btnGuardar.value;
    let urlEnvio = `${url}/${entidad}`;
    let method = "POST";
    if(accion === "Editar"){
        urlEnvio += `/${indice.value}`
        method = "PUT";
    }
const respuesta = await fetch (urlEnvio,{
    method,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify (datos),
});
        if (respuesta.ok){
            listarConsultas();
            resetModal();
        }
    } catch (error) {
    throw error;
    };

};

function editar(index){
    return function cuandoClickeo(){
        btnGuardar.value = "Editar"
        $("#exampleModalCenter").modal("toggle");
        const consulta = consultas[index];
        indice.value = index;
        mascota.value = consulta.mascota.id;
        veterinario.value = consulta.veterinaria.id;
        historia.value = consulta.historia;
        diagnostico.value = consulta.diagnostico;
    }
}


function resetModal(){
    indice.value = "";
    mascota.value = "";
    veterinario.value = "";
    historia.value = "";
    diagnostico.value = "";
    btnGuardar.value="Guardar"
}


form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;


listarConsultas();
listarMascotas();
listarVeterinarios();


