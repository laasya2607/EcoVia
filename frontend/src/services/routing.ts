const API_KEY = import.meta.env.VITE_ROUTE_API_KEY;
console.log("ORS KEY:", API_KEY);

export async function getRoute(
    source:{
        lat:number;
        lng:number;
    },
    destination:{
        lat:number;
        lng:number;
    },
    mode:string
){


let profile = "foot-walking";


if(mode==="cycling"){
    profile="cycling-regular";
}


if(mode==="driving"){
    profile="driving-car";
}

console.log("PROFILE:", profile);
console.log("SOURCE:", source);
console.log("DESTINATION:", destination);
console.log("Sending request to OpenRouteService...");
const response = await fetch(

`https://api.openrouteservice.org/v2/directions/${profile}/geojson`,

{
method:"POST",

headers:{
    "Authorization":API_KEY,
    "Content-Type":"application/json"
},

body:JSON.stringify({

coordinates:[

[
source.lng,
source.lat
],

[
destination.lng,
destination.lat
]

]

})

}

);


if (!response.ok) {
  const text = await response.text();

  console.log("ORS ERROR:");
  console.log(text);

  throw new Error(text);
}



const data = await response.json();

console.log("FULL ROUTE RESPONSE:", data);

return data;

}