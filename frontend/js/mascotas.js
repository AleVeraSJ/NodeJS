const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueño = document.getElementById("dueño");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const indice = document.getElementById("indice");

let mascotas = [
    {
        tipo:"Gato",
        nombre:"Manchas",
        dueño:"Ale"
    },
    {
        tipo:"Perro",
        nombre:"Manchitas",
        dueño:"Julieta"
    }
];

function listarMascotas(){
    solicitarMascotas();
    let htmlMascotas = mascotas.map((mascota, index)=>
        `<th scope="row">${index}</th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>}
        <td>${mascota.dueño}</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary editar"data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="far fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaMascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));
}

function enviarDatos(evento){
    evento.preventDefault();
    let datos= {
        tipo: tipo.value,
        nombre: nombre.value,
        dueño: dueño.value
    };
    let accion = btnGuardar.value;
    console.log("enviar datos", accion);
    switch(accion){
        case "Editar":
            mascotas[indice.value]=datos;
            break;
        default:
            mascotas.push(datos);
            break;
    }
    listarMascotas();
    resetModal();
}


function editar(index){
    return function cuandoClickeo(){
        btnGuardar.value = "Editar"
        let mascota = mascotas[index];
        nombre.value = mascota.nombre;
        dueño.value = mascota.dueño;
        tipo.value = mascota.tipo;
        indice.value = index;
    }
}

function resetModal(){
    nombre.value = "";
    dueño.value = "";
    tipo.value = "";
    indice.value = "";
    btnGuardar.value="Guardar"
}

function eliminar(index){
    return function clickEnEliminar(){
        mascotas = mascotas.filter((mascota, indiceMascota) => indiceMascota !== index);
        listarMascotas();
    }
}

listarMascotas();

function solicitarMascotas(){
    fetch("http://localhost:5000/mascotas",{}).then((respuesta)=> {
        if(respuesta.ok){
            return respuesta.json();
        }
    }).then(mascotasDelServer =>{
        console.log({mascotasDelServer});
    });
}

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;