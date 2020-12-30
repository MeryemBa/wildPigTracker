import React from 'react';
import {GeolocateControl} from "react-map-gl";
import styles from  './user-geolocation.module.css'

function UserLocation() {
    return (
       
            <GeolocateControl
            className={styles.geolocationContainer}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          showUserLocation={true}
        />
        
    )
}

export default UserLocation
