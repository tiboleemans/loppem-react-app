import React from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 51.159768629774,
  lng: 3.158990726018322
};

const ContactMap = () => {

  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDsvN0ebBKVQ-sOJDChl5Ri1cNTXWjI1p4"
  })


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      mapTypeId="satellite"
    >
    </GoogleMap>
  ) : <></>
}

export default React.memo(ContactMap)