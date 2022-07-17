import { LatLng } from "leaflet";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { CourtType } from "./CourtContainer";
import "./CourtRegister.css";

const initialMarkers: LatLng = new LatLng(51.505, -0.09);

export default function CourtRegister(court: CourtType) {
  const [marker, setMarker] = useState(initialMarkers);

  function LocationMarkers() {
    const map = useMapEvents({
      click(e) {
        setMarker(e.latlng);

        return (
          <React.Fragment>
            <Marker position={marker}></Marker>
          </React.Fragment>
        );
      },
    });
  }

  function LeafletMap() {
    const mapCentre = new LatLng(-5.82, -35.21);

    return (
      <MapContainer center={mapCentre} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkers />
      </MapContainer>
    );
  }

  return (
    <div className="court__register">
      <fieldset>
        <legend>Nova Quadra</legend>

        <label htmlFor="description">Descrição</label>
        <input type="text" />

        <label htmlFor="address">Endereço</label>
        <input type="text" />

        <label htmlFor="latitude">Latitude</label>
        <input type="number" value={marker.lat} />

        <label htmlFor="longitude">Longitude</label>
        <input type="number" value={marker.lng} />
      </fieldset>
      <LeafletMap />
    </div>
  );
}
