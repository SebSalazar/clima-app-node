require("colors");
require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausaMenu,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opc;
  console.clear();
  const busquedas = new Busquedas();

  do {
    opc = await inquirerMenu();
    switch (opc) {
      case 1:
        // Mostrar mensaje
        const lugarBusqueda = await leerInput("Escribe la ciudad que quieres buscar: ");
        // Buscar lugares
        const lugares = await busquedas.ciudad(lugarBusqueda);
        // Selecciona el lugar
        if(lugares.length === 0){
          console.log('Ciudad no encontrada :c');
        }else{
          const idLugar = await listarLugares(lugares);
          //console.log({ idLugar });
          const lugarSel = lugares.find(l => l.id === idLugar);
          // Guardar en DB
          busquedas.agregarHistorial(lugarSel.nombre);
          // Clima
          const clima = await busquedas.climaLugar(lugarSel.latitud, lugarSel.longitud);
          // Mostrar resultados
          console.log("\nInformación de la ciudad\n".cyan);
          console.log("Ciudad: ", lugarSel.nombre);
          console.log("Latitud: ", lugarSel.latitud);
          console.log("Longitud: ", lugarSel.longitud);
          console.log("Temperatura: ", clima.temp);
          console.log("Temp. minima: ", clima.min);
          console.log("Temp. maxima: ", clima.max);
          console.log("Como esta el clima: ", clima.desc.cyan);
        }

        break;
      case 2:
        busquedas.capitalizarHistorial.forEach((lugar, i) =>{
          const idx = `${i+1}.`.cyan;
          console.log(`${idx} - ${lugar}`);
        })
        break;
      default:
        break;
    }

    await pausaMenu();
  } while (opc !== 0);
};

main();
