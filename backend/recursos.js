module.exports = {
    mascotas: [
        {tipo:"perro", nombre: "Rocco0", dueño:"Ale" },
        {tipo:"perro", nombre: "Rocco1", dueño:"Ale" },
        {tipo:"perro", nombre: "Rocco2", dueño:"Ale" },
        {tipo:"perro", nombre: "Rocco3", dueño:"Ale" }
    ],

    veterinarias: [
        {nombre: "Ale", apellido: "Vera", documento: "40592085" },
        {nombre: "Jesus", apellido: "Barbero", documento: "34355665" },
        {nombre: "Rama", apellido: "Ortega", documento: "43543435" },
        {nombre: "Mario", apellido: "Abad", documento: "45647598" },
    ],

    duenos: [
        {nombre: "Maria", apellido: "Vera", documento: "40555085" },
        {nombre: "Octavio", apellido: "Barbero", documento: "34445665" },
        {nombre: "Matias", apellido: "Ortega", documento: "4354354335" },
        {nombre: "Mariana", apellido: "Abad", documento: "456473454348" }
    ],
    consultas: [
        {mascota: 0, 
        veterinaria: 0,  
        fechaCreacion: new Date (),
        fechaEdicion: new Date (), 
        historia: "", 
        diagnostico: ""
        },
    ],
    
};