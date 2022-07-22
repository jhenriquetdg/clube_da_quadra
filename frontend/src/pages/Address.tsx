import { UserCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { X, Pencil } from "phosphor-react";

import "./Address.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { latLng } from "leaflet";

interface AddressType {
    CEP: string;
    numero: number;
    complemento: string;
    UF: string;
    logradouro: string;
    localidade: string;
    latitude: number;
    longitude: number;
    id: string;
}

export default function Address() {
    const [address, setAddress] = useState<AddressType[]>([]);

    async function fetchData() {
        const response = await api.get("/addresses");

        setAddress(response.data.addresses);
        console.log(address);
    }

    useEffect(() => {
        console.log("UseEffect");
        fetchData();
    }, []);

    function deleteAddress(id: string) {
        console.log(id);
        api.delete("/address", {
            data: {
                id: id,
            },
        });
        fetchData();
    }

    return (
        <>
            <div className="address__container">
                <h1>Endereços</h1>
                <button onClick={fetchData}>Fetch Data</button>

                {address?.map((address) => {
                    return (
                        <div key={address.id} className="address__card">
                            <div className="control">
                                <div>
                                    <span> #{address.id} </span>
                                </div>
                                <div>
                                    <button>
                                        <Pencil size={30} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteAddress(address.id);
                                        }}
                                    >
                                        <X size={30} />
                                    </button>
                                </div>
                            </div>

                            <MapContainer
                                center={latLng(
                                    address.latitude,
                                    address.longitude
                                )}
                                zoom={13}
                                scrollWheelZoom={true}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker
                                    position={latLng(
                                        address.latitude,
                                        address.longitude
                                    )}
                                >
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily
                                        customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>

                            <p>
                                {address.logradouro}, Nº {address.numero}{" "}
                            </p>
                            <p> {address.complemento} </p>
                            <p> {address.CEP} </p>
                            <p>
                                {" "}
                                {address.localidade}, {address.UF}{" "}
                            </p>
                            <p>
                                {" "}
                                @ ({address.latitude},{address.longitude}){" "}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
