import { useState,useEffect } from "react";
import InteractiveMap from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import { formatRelative, parseISO } from "date-fns";

async function fetchPoints() {
  const response = await fetch("./api/points");
  const { points } = await response.json();
  return points.map((point) => ({
    id: point._id,
    longitude: point.location.coordinates[0],
    latitude: point.location.coordinates[1],
    createdAt: point.createdAt,
  }));
 
 
}

async function createPoint(newpoint) {
  const response = await fetch("./api/points/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({point:newpoint }),
  });
  const data = await response.json();
  return data.point;
}
export default function Map() {
  
  useEffect(() => {
    fetchPoints().then(res => {
      console.log("fetch result")
     setmarker(res);
    })
  
  }, [fetchPoints]);

 
    const [marker, setmarker] = useState([]);
    const [showPopup,setshowPopup]=useState(false);
    const [locationId,setLocationId]=useState("");
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // The latitude and longitude of the center of Ifran Morroco
    latitude: 33.527870,
    longitude: -5.105100,
    zoom: 9
  });
 const apiKey=process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const handeClick=({lngLat:[longitude,latitude]})=>{

    setmarker((prevMarker)=>[...prevMarker,{longitude,latitude, createdAt:new Date(),id:new Date()}]);
    createPoint({longitude,latitude});
    // setLocation({longitude,latitude});
   
}
const handelPopup=(e)=>{

  setLocationId(e.target.attributes.id.value);
    setshowPopup(true);
   
}

  return (
    <InteractiveMap
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={apiKey}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onClick={handeClick}
    >
     {marker.map((m,i)=>(
      <div  key={i}  >
     <Marker longitude={m.longitude} latitude={m.latitude} >
         <img src="/pig.png" style={{marginLeft:"-12px",marginTop:"-12px"}}
          width="24" height="24" longitude={m.longitude} latitude={m.latitude}  id={m.id} onClick={handelPopup}  />
         </Marker>
     {(m.id === locationId  && showPopup)&&<Popup
        longitude={m.longitude} 
        latitude={m.latitude}
     closeButton={true}
     closeOnClick={false}
     onClose={() =>{setshowPopup(false),setLocationId("")}}
     anchor="top" >
     <div >Pig spotted {formatRelative(parseISO(m.createdAt), new Date())}</div>
   </Popup>}
   </div>
     )
     )}
        
    </InteractiveMap>
  );
}
