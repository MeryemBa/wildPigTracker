import { useState } from "react";
import InteractiveMap from "react-map-gl";
import ReactMapGL, { Marker, Popup } from "react-map-gl";


export default function Map({ locations }) {
    const [marker, setmarker] = useState([]);
    const [showPopup,setshowPopup]=useState(false);
    const [location,setLocation]=useState({});
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

    setmarker((prevMarker)=>[...prevMarker,{longitude,latitude}])
    setLocation({longitude,latitude})
   
}
const handelPopup=(e)=>{

const latitude=parseFloat(e.target.attributes.latitude.value);

const longitude=parseFloat(e.target.attributes.longitude.value );
  setLocation({longitude,latitude});
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
      <div  key={i}>
     <Marker longitude={m.longitude} latitude={m.latitude} >
         <img src="/pig.png" style={{marginLeft:"-12px",marginTop:"-24px"}} width="24" height="24" longitude={m.longitude} latitude={m.latitude}  onClick={handelPopup} />
         </Marker>
     {(JSON.stringify(m) === JSON.stringify(location)  && showPopup)&&<Popup
        longitude={m.longitude} 
        latitude={m.latitude}
     closeButton={true}
     closeOnClick={false}
     onClose={() =>{setshowPopup(false),setLocation({})}}
     anchor="top" >
     <div>{`You are here ${i}`}</div>
   </Popup>}
   </div>
     )
     )}
        
    </InteractiveMap>
  );
}
