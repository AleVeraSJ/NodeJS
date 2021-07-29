const listaConsultas = document.getElementById ("lista-consultas");


/*  {mascota: 0, 
        veterinaria: 0,  
        fechaCreacion: new Date (),
        fechaEdicion: new Date (), 
        historia: "", 
        diagnostico: ""
        },*/




let consultas = [];
const url = "http://localhost:5000/consultas";

async function listarConsultas() {
    try {
        const respuesta = await fetch (url);
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
                        <button type="button" class="btn btn-primary">Editar</button>
                    </div>
                    </td>
                    </tr>
                <tr>`
             )
             .join("");
             listaConsultas.innerHTML = htmlConsultas;

        
        }



    } catch (error) {
        throw error;
    }
}
listarConsultas();











`<tr>
<th scope="row">2</th>
<td>Jacob</td>
<td>Thornton</td>
<td>@fat</td>
<td>
  <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-primary">Editar</button>
    <button type="button" class="btn btn-danger">Eliminar</button>
  </div>
</td>
</tr>
<tr>`