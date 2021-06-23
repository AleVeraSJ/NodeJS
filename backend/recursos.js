module.exports = {
    mascotas: [
        {tipo:"Perro", nombre: "Rocco0", dueno:"Ale" },
        {tipo:"Perro", nombre: "Rocco1", dueno:"Ale" },
        {tipo:"Perro", nombre: "Rocco2", dueno:"Ale" },
        {tipo:"Perro", nombre: "Rocco3", dueno:"Ale" }
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