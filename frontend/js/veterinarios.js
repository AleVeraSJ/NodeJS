const { veterinarias } = require("../../Backend/recursos");

const listaVeterinarias = document.getElementById("lista-Veterinarias");
const tipo = document.getElementById("pais");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/veterinarias";
let Veterinarias = [];

async function listarVeterinarias(){

    try {
        const respuesta = await fetch(url);
        const veterinariasDelServer = await respuesta.json();
        if (Array.isArray(veterinariasDelServer)){
           veterinarias = veterinariasDelServer;
        }
        if (veterinarias.length>0){

        const htmlVeterinarias = Veterinarias.map((Veterinaria, index)=>
            `<th scope="row">${index}</th>
            <td>${Veterinaria.tipo}</td>
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

function enviarDatos(evento){
    evento.preventDefault();
    let datos= {
        tipo: tipo.value,
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value
    };
    let accion = btnGuardar.value;
    console.log("enviar datos", accion);
    switch(accion){
        case "Editar":
            Veterinarias[indice.value]=datos;
            break;
        default:
            Veterinarias.push(datos);
            break;
    }
    listarVeterinarias();
    resetModal();
}


function editar(index){
    return function cuandoClickeo(){
        btnGuardar.value = "Editar"
        let Veterinaria = Veterinarias[index];
        nombre.value = Veterinaria.nombre;
        apellido.value = Veterinaria.apellido;
        tipo.value = Veterinaria.tipo;
        indice.value = index;
        identificacion.value = Veterinaria.identificacion;
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
    return function clickEnEliminar(){
        Veterinarias = Veterinarias.filter((Veterinaria, indiceVeterinaria) => indiceVeterinaria !== index);
        listarVeterinarias();
    }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;