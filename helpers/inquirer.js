require("colors");
const inquirer = require("inquirer");

const menuOpts = [
  {
    type: "list",
    name: "opt",
    message: "Seleccione una opción",
    choices: [
      {
        value: 1,
        name: `${"1.".cyan} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".cyan} Historial de busquedas`,
      },
      {
        value: 0,
        name: `${"0.".cyan} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("\t\t\t=========================================".cyan);
  console.log("\t\t\t   BIENVENIDO, SELECCIONA UNA OPCIÓN     ".cyan);
  console.log("\t\t\t=========================================\n".cyan);

  const { opt } = await inquirer.prompt(menuOpts);
  return opt;
};

const pausaMenu = async () => {
  const pausaOpt = [
    {
      type: "input",
      name: "pause",
      message: "Seleccione cualquier tecla para continuar",
    },
  ];

  console.log("\n");
  await inquirer.prompt(pausaOpt);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "descri",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { descri } = await inquirer.prompt(question);
  return descri;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    let idx = i + 1;
    return {
      value: lugar.id,
      name: `${idx.toString().cyan}. ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.cyan + ' Cancelar'
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Seleccione ciudad: ",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const listarChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    let idx = i + 1;
    return {
      value: tarea.id,
      name: `${idx.toString().cyan} ${tarea.describe}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione la tarea a completar",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

const listarEditar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    let idx = i + 1;
    return {
      value: [tarea.id, tarea.describe],
      name: `${idx.toString().green}. ${tarea.describe}`,
    };
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "\nEditando tarea -> ",
      choices,
    },
  ];
  const {id} = await inquirer.prompt(questions);
  return id;
};

module.exports = {
  inquirerMenu,
  pausaMenu,
  leerInput,
  listarLugares,
  confirmar,
  listarChecklist,
  listarEditar,
};
