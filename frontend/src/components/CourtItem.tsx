import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import { CourtType } from "./CourtContainer";

import { latLng } from "leaflet";
import { useCallback } from "react";
import { Pencil } from "phosphor-react";

import "./CourtItem.css";

export interface CourtItemProps {
  court: CourtType;
}

export default function CourtItem({ court }: CourtItemProps) {
  const position = latLng(court.latitude, court.longitude);

  return (
    <div className="court__card">
      <div className="header">
        <h1>
          #{court.ID}: {court.descricao}
        </h1>
        <button>
          <Pencil size={20} />
        </button>
      </div>

      <p className="city-name">{court.endereco}</p>

      <MapContainer center={position} zoom={1} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
