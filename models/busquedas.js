const fs = require('fs');
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDB();
  }

  get capitalizarHistorial(){
      return this.historial.map( lugar => {
          let palabras = lugar.split(" ");
          palabras = palabras.map(p => p[0].toUpperCase()+p.substring(1));

          return palabras.join(' ');
      })
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    // Peticion HTTP
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });

      const resp = await intance.get();
      // Retornara el array de todas las ciudades que coincidan con el lugar
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        longitud: lugar.center[0],
        latitud: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    if(this.historial.includes(lugar.toLocaleLowerCase())) return;

    this.historial = this.historial.splice(0,5);
    this.historial.unshift(lugar.toLocaleLowerCase());

    this.guardarDB();
  }

  guardarDB(){
    const payload = {historial:this.historial};
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB(){
    if(fs.existsSync(this.dbPath)){
        const data = fs.readFileSync(this.dbPath,{encoding:'utf8'});
        const info = JSON.parse(data);
        this.historial = [...info.historial];
    }
  }
}

module.exports = Busquedas;
