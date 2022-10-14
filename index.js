//dotenv
require('dotenv').config()
const axios = require ('axios')
const appid = process.env.appid

const q = 'Sao bernardo do campo'

//metric: celsius
//imperial: farenheit
const units = 'metric'

const lang = 'pt_BR'

const cnt = 10

const base_url = 'https://api.openweathermap.org/data/2.5/forecast'

const url = `${base_url}?q=${q}&units=${units}&lang=${lang}&cnt=${cnt}&appid=${appid}`
const p = axios.get(url)
p
    .then((res) => {
  console.log(res.data)
  return res.data
})

    .then((res) => {
  //mostra o total e devolve o resultado
  console.log(res.cnt);
  return res;
})

    .then((res) => {
  //mostra o total e devolve o resultado
  console.log("aqui", res);
  return res ['list'] ;
})
    .then((res) => {
    //para cada resultado, mostra algumas informações
    for(let previsao of res) {
        console.log(`
            ${new Date(previsao.dt * 1000).toLocaleString()},
            ${'Min: ' +previsao.main.temp_min}\u00B0C,
            ${'Max: ' +previsao.main.temp_max}\u00B0C,
            ${'Umd: ' +previsao.main.humidity}%,
            ${previsao.weather[0].description}
        `)
    }
    return res
})
    .then((res) =>{
        //verifica quantas previsões tem percepção humana de temperatura
        //acima de 30º
        const lista = res.filter(r => r.main.feels_like >= 30)
        console.log(`${lista.length} previsoes tem percepção acima de 30 graus`)
    })
