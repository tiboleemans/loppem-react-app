import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

const ContactMap1 = props => {
  return (
    <GoogleMap defaultZoom={15} defaultCenter={{
      lat: 51.15994360494397,
      lng: 3.1590096808385915
    }}>
      {props.isMarkerShown && (
        <Marker position={{
          lat: 51.15994360494397,
          lng: 3.1590096808385915
        }}/>
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(ContactMap1));
