import React from 'react';
import './UserLocationModal.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const UserLocationModal = (props) => {
    const mapStyles = {
        width: '70vw',
        minHeight: '80vh',
        maxHeight: '80vh',
        borderRadius: '4px',
        boxShadow: 'inset 2px 7px 25px rgba(0,0,0,0.36)',
        top: '10vh',
        left: '-85vw',
        zIndex: '10001'
    }

    return (
        <div className="UserLocationModal">
            {props.address ? <Map
                    google={props.google}
                    zoom={15}
                    zoomControl={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                    mapTypeControl={false}
                    style={mapStyles}
                    initialCenter={{
                        lat: props.address ? parseFloat(props.address.split('$')[0]) : 12.1,
                        lng: props.address ? parseFloat(props.address.split('$')[1]) : 76.1,
                    }}
                    >
                    <Marker />
                </Map> : null }
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAV9ac8VzlYvmYhy3uSXJyAVUOq_TySMw4'
  })(UserLocationModal);
