import React from 'react';
import {Popup } from "react-map-gl";
import { formatRelative, parseISO } from "date-fns";
import style from "./popup.module.css";


function PopupInfo({handelClose,point,children}) {
    return (
        <Popup
        className={style.info}
        longitude={point.longitude} 
        latitude={point.latitude}
     closeButton={true}
     closeOnClick={false}
     onClose={() =>{handelClose()}}
     anchor="top" >
     <div className={style.infoMessage} >Pig spotted {formatRelative(parseISO(point.createdAt), new Date())}</div>
   </Popup>
   )
}


export default PopupInfo;
