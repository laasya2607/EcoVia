export async function getWeather(
  lat:number,
  lng:number
){

const response = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,apparent_temperature&hourly=precipitation_probability`
);


const data = await response.json();


return {

temperature:
data.current.temperature_2m,


feelsLike:
data.current.apparent_temperature,


wind:
data.current.wind_speed_10m,


rainChance:
data.hourly
.precipitation_probability[0]

};


}