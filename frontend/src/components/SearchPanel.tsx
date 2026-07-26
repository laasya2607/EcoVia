import { useState } from "react";

import {
  Bike,
  Car,
  Footprints,
  UserRound,
  Accessibility,
  Dumbbell,
  GraduationCap,
  Briefcase,
  MapPinCheck
} from "lucide-react";

import LocationSearch from "./LocationSearch";



interface Location {

  name:string;
  lat:number;
  lng:number;

}



interface SearchPanelProps {


onSearch:(data:{

source:string;

destination:string;

sourceLocation:Location;

destinationLocation:Location;

travelMode:string;

travellerType:string;

})=>void;


}




const travellerTypes=[


{
id:"senior",
label:"Senior Friendly",
icon:<UserRound size={22}/>,
description:"Smooth paths, crossings and easy walking"
},



{
id:"wheelchair",
label:"Wheelchair Accessible",
icon:<Accessibility size={22}/>,
description:"Barrier free paths and accessible roads"
},



{
id:"fitness",
label:"Fitness Route",
icon:<Dumbbell size={22}/>,
description:"Walking, jogging and scenic paths"
},



{
id:"student",
label:"Student Safe",
icon:<GraduationCap size={22}/>,
description:"Safer roads with less risk"
},



{
id:"office",
label:"Office Fast",
icon:<Briefcase size={22}/>,
description:"Fast and reliable commute"
},


];








export default function SearchPanel({
onSearch
}:SearchPanelProps){



const [source,setSource]=useState("");

const [destination,setDestination]=useState("");



const [sourceLocation,setSourceLocation]=useState<Location | null>(null);

const [destinationLocation,setDestinationLocation]=useState<Location | null>(null);



const [travelMode,setTravelMode]=useState("walking");


const [travellerType,setTravellerType]=useState("");








const handleSearch=()=>{


if(!sourceLocation){

alert("Please confirm your starting location");

return;

}



if(!destinationLocation){

alert("Please confirm your destination");

return;

}



if(!travellerType){

alert("Please select traveller type");

return;

}




onSearch({

source,

destination,

sourceLocation,

destinationLocation,

travelMode,

travellerType

});



};









return(


<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
w-full
"
>



<h2
className="
text-xl
font-bold
text-[#2E7D32]
mb-5
"
>

Plan Your Journey

</h2>







{/* LOCATION */}


<div className="space-y-4">



<LocationSearch


placeholder="Current Location"


value={source}


setValue={setSource}


setLocation={setSourceLocation}


allowCurrentLocation={true}


/>





<LocationSearch


placeholder="Destination"


value={destination}


setValue={setDestination}


setLocation={setDestinationLocation}


/>



</div>









{/* TRAVEL MODE */}



<h3
className="
font-semibold
mt-6
mb-3
"
>

Travel Mode

</h3>





<div
className="
flex
gap-3
flex-wrap
"
>





<button

onClick={()=>setTravelMode("walking")}


className={`

flex
items-center
gap-2
px-4
py-3
rounded-xl

${

travelMode==="walking"

?

"bg-green-600 text-white"

:

"bg-gray-100"

}

`}


>

<Footprints size={20}/>

Walking

</button>






<button

onClick={()=>setTravelMode("cycling")}


className={`

flex
items-center
gap-2
px-4
py-3
rounded-xl

${

travelMode==="cycling"

?

"bg-green-600 text-white"

:

"bg-gray-100"

}

`}


>


<Bike size={20}/>

Cycling


</button>







<button

onClick={()=>setTravelMode("driving")}


className={`

flex
items-center
gap-2
px-4
py-3
rounded-xl

${

travelMode==="driving"

?

"bg-green-600 text-white"

:

"bg-gray-100"

}

`}


>


<Car size={20}/>

Driving


</button>





</div>









{/* TRAVELLER TYPE */}



<h3
className="
font-semibold
mt-6
mb-3
"
>

Choose Traveller Type

</h3>







<div
className="
space-y-3
"
>


{

travellerTypes.map((type)=>(



<button


key={type.id}


onClick={()=>setTravellerType(type.id)}



className={`

w-full

flex

items-center

gap-4

p-4

rounded-2xl

border

transition

text-left



${

travellerType===type.id

?

"bg-green-100 border-green-600 text-green-700"

:

"bg-gray-50"

}

`}



>


<div>

{type.icon}

</div>





<div>


<p
className="
font-semibold
"
>

{type.label}

</p>




<p
className="
text-xs
text-gray-500
"
>

{type.description}

</p>


</div>





{

travellerType===type.id &&

<MapPinCheck
size={22}
className="ml-auto text-green-600"
/>

}




</button>




))


}



</div>









{/* SEARCH BUTTON */}



<button


onClick={handleSearch}



disabled={
!sourceLocation ||
!destinationLocation
}


className={`

mt-6

w-full

py-4

rounded-2xl

font-semibold

transition


${

(!sourceLocation || !destinationLocation)

?

"bg-gray-300 text-gray-500 cursor-not-allowed"

:

"bg-[#2E7D32] text-white hover:bg-green-700"

}

`}



>


Find Best Route


</button>






</div>


);


}