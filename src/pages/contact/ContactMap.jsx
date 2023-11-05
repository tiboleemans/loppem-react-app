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

const ContactMap = (props) => {

  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDsvN0ebBKVQ-sOJDChl5Ri1cNTXWjI1p4"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom="17"
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapTypeId="satellite"
    >
      <Marker position={center} />
    </GoogleMap>
  ) : <></>
}

export default React.memo(ContactMap)