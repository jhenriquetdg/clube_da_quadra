import { LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { CourtType } from "../pages/Court";
import "./CourtRegister.css";

interface CourtContainerProps {
    currentCourt: CourtType;
    setCurrentCourt: (court: CourtType) => void;
}

const initialMarkers: LatLng = new LatLng(51.505, -0.09);

export default function CourtRegister({
    currentCourt,
    setCurrentCourt,
}: CourtContainerProps) {
    const [marker, setMarker] = useState(initialMarkers);

    function LocationMarkers() {
        const map = useMapEvents({
            click(e) {
                console.log("------------");
                console.log(currentCourt);
                setMarker(e.latlng);
                setCurrentCourt({
                    ...currentCourt,
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                });
                console.log(currentCourt);
                map.flyTo(e.latlng);
            },
        });

        return (
            <React.Fragment>
                <Marker position={marker}></Marker>
            </React.Fragment>
        );
    }

    function LeafletMap() {
        console.log(currentCourt);

        const mapCentre = new LatLng(
            currentCourt.latitude,
            currentCourt.longitude
        );
        // const mapCentre = new LatLng(0, 0);

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
                <input type="text" value={currentCourt.descricao} />

                <label htmlFor="address">Endereço</label>
                <input type="text" value={currentCourt.endereco} />

                <label htmlFor="latitude">Latitude</label>
                <input type="number" value={currentCourt.latitude} />

                <label htmlFor="longitude">Longitude</label>
                <input type="number" value={currentCourt.longitude} />
            </fieldset>
            <LeafletMap />
        </div>
    );
}
