import { useState, memo } from "react";
import InteractiveMap,{ Marker} from "react-map-gl";
import { useQuery, useMutation,useQueryClient } from "react-query";
import { v1 as uuidv1 } from 'uuid'

import UserLocation from "../usergeolocation/usergeolocation-comp";
import  PopupInfo  from "../popup/popup-comp";


//fetching points from database
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
//creating point in database
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
// fetching data and store them in the cache for better user experience
const useCreatPoint=()=>{
  const queryClient = useQueryClient();
  return useMutation(createPoint,{
    //we will update the cache pefor getting a response from the server
    onMutate:async (point) => {
      // 1) cancel queries
     await queryClient.cancelQueries("points");

      

      // 2) save snapshot
      const snapshot = queryClient.getQueryData("points");

      // 3) optimistically update cache
      queryClient.setQueryData("points", (previousPoints) => [
        ...previousPoints,
        {
          id: uuidv1(),
          longitude: point.longitude,
          latitude: point.latitude,
          createdAt: new Date().toISOString(),
        },
      ]);
      // 4) return rollback function which reset cache back to snapshot calld incase of errors
      return {snapshot};
    },

    //if there is an error on the creation return to the previeus state
    onError:(error,point, context) => queryClient.setQueryData("points", context.snapshot),
    //if everything is ok update the cache with the new value 
    onSettled:()=>queryClient.invalidateQueries("points")
  });

}
  function Map() {
 
  const {isFetchedAfterMount,data} = useQuery('points', fetchPoints);
  const points=!isFetchedAfterMount?[]:data;

 
  
  
  const createPoint = useCreatPoint();
 

    


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
  
const handeClick=({lngLat:[longitude,latitude]})=>{
    createPoint.mutate({longitude,latitude});
    
   
}
const handelPopup=(e)=>{

  setLocationId(e.target.attributes.id.value);
    setshowPopup(true);
   
}
const handelClosePopup=()=>{
  setshowPopup(false);
  setLocationId("");
}

  return (
    <InteractiveMap
      mapStyle="mapbox://styles/mapbox/streets-v9"
      maxZoom="20"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onClick={handeClick}
    >
      <UserLocation/>
        
     {points.length==0?<h1>lodaing markers</h1>: points.map((point,i)=>(
      <div  key={i}  >
     <Marker longitude={point.longitude} latitude={point.latitude} >
         <img src="/pig.png" style={{marginLeft:"-12px",marginTop:"-12px"}}
          width="24" height="24" longitude={point.longitude} latitude={point.latitude}  id={point.id} onClick={handelPopup}  />
         </Marker>
     {(point.id === locationId  && showPopup) && < PopupInfo point={point} handelClose={handelClosePopup}/>}
  </div> 
 
     )
     )}
        
    </InteractiveMap>
  );
}
export default memo(Map);
export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('points', fetchPoints)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}