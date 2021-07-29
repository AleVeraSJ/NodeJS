module.exports = {
    mascotas: [
        {tipo:"Perro", nombre: "Rocco0", dueno:"Ale" },
        {tipo:"Perro", nombre: "Rocco1", dueno:"Ale" },
        {tipo:"Perro", nombre: "Rocco2", dueno:"Ale" },
        {tipo:"Perro", nombre: "Rocco3", dueno:"Ale" }
    ],

    veterinarias: [
        {tipo:"Argentina",nombre: "Ale", apellido: "Vera", identificacion: "40592085" },
        {tipo:"Argentina",nombre: "Jesus", apellido: "Barbero", identificacion: "34355665" },
        {tipo:"Argentina",nombre: "Rama", apellido: "Ortega", identificacion: "43543435" },
        {tipo:"Argentina",nombre: "Mario", apellido: "Abad", identificacion: "45647598" },
    ],

    duenos: [
        {tipo: "Argentina", nombre: "Maria", apellido: "Vera", identificacion: "40555085" },
        {tipo: "Argentina", nombre: "Octavio", apellido: "Barbero", identificacion: "34445665" },
        {tipo: "Argentina", nombre: "Matias", apellido: "Ortega", identificacion: "4354354335" },
        {tipo: "Argentina", nombre: "Mariana", apellido: "Abad", identificacion: "456473454348" }
    ],
    consultas: [
        {mascota: 0, 
        veterinaria: 0,  
        fechaCreacion: new Date (),
        fechaEdicion: new Date (), 
        historia: "", 
        diagnostico: "Ejemplo de diagnostico"
        },
    ],
    
};