import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  CheckCircle
} from "lucide-react";


interface Location {

  name:string;

  lat:number;

  lng:number;

}
interface SavedPlace {
  id: number;
  placeName: string;
  location: string;
  lat: number;
  lng: number;
}


interface Props {

  placeholder:string;

  value:string;

  setValue:(value:string)=>void;

  setLocation?:(location:Location)=>void;

  allowCurrentLocation?:boolean;

}



export default function LocationSearch({

  placeholder,

  value,

  setValue,

  setLocation,

  allowCurrentLocation=false

}:Props){



const [suggestions,setSuggestions]=useState<any[]>([]);

const [loading,setLoading]=useState(false);

const [confirmed,setConfirmed]=useState(false);

const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);

useEffect(() => {
  const data = localStorage.getItem("savedPlaces");

  if (data) {
    setSavedPlaces(JSON.parse(data));
  }
}, []);



useEffect(()=>{


const timer=setTimeout(()=>{


if(value.length>=3 && !confirmed){

searchLocation(value);

}
else{

setSuggestions([]);

}



},700);



return ()=>clearTimeout(timer);



},[value]);









const searchLocation=async(text:string)=>{
console.log("Searching:", text);

try{


setLoading(true);



const response=await fetch(

`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=5&q=${encodeURIComponent(text)}`,

{

  headers:{
  "Accept-Language":"en",
  "User-Agent":"EcoVia-App"
}


}

);

console.log("Status:", response.status);

const data=await response.json();

console.log("Locations:", data);

setSuggestions(data);



}

catch(error){

console.log(error);

}


finally{

setLoading(false);

}



};









const selectPlace=(place:any)=>{


const location={


name:place.display_name,

lat:Number(place.lat),

lng:Number(place.lon)


};

console.log("Selected Location:", location);

setValue(place.display_name);


setLocation?.(location);


setConfirmed(true);


setSuggestions([]);



};

const selectSavedPlace = (place: SavedPlace) => {

  setValue(place.location);

  setLocation?.({
    name: place.location,
    lat: place.lat,
    lng: place.lng,
  });

  setConfirmed(true);
  setSuggestions([]);

};







const getCurrentLocation=()=>{


navigator.geolocation.getCurrentPosition(

(position)=>{


const lat=position.coords.latitude;

const lng=position.coords.longitude;



setValue("Current Location");



setLocation?.({

name:"Current Location",

lat,

lng

});



setConfirmed(true);



},


()=>{

alert("Location permission denied");

}



);



};









return (

<div className="relative">





<div className="
flex
items-center
gap-3
bg-gray-100
rounded-xl
p-3
">





<MapPin className="text-green-600"/>





<input


value={value}



onChange={(e)=>{


setValue(e.target.value);


setConfirmed(false);


}}



placeholder={placeholder}



className="
bg-transparent
outline-none
w-full
"



/>







{

confirmed &&


<CheckCircle

className="
text-green-600
"

size={22}

/>


}



</div>









{
allowCurrentLocation &&


<button


onClick={getCurrentLocation}



className="
mt-2
flex
items-center
gap-2
text-sm
text-green-700
"



>


<Navigation size={16}/>


Use Current Location



</button>


}









{
loading &&


<p className="
text-xs
text-gray-500
mt-2
">

Searching...

</p>


}









<>
  {savedPlaces.length > 0 && (
    <>
      <div className="px-3 py-2 bg-gray-100 text-xs font-semibold text-gray-500">
        Saved Places
      </div>

      {savedPlaces.map((place) => (

        <div
          key={place.id}
          onClick={() => selectSavedPlace(place)}
          className="p-3 cursor-pointer hover:bg-green-50 border-b"
        >

          <p className="font-semibold text-[#2E7D32]">
            {place.placeName}
          </p>

          <p className="text-xs text-gray-500">
            {place.location}
          </p>

        </div>

      ))}

      <div className="px-3 py-2 bg-gray-100 text-xs font-semibold text-gray-500">
        Search Results
      </div>
    </>
  )}

  {suggestions.map((place) => (

    <div
      key={place.place_id}
      onClick={() => selectPlace(place)}
      className="p-3 cursor-pointer hover:bg-green-50 text-sm"
    >

      {place.display_name}

    </div>

  ))}
</>





</div>


);


}