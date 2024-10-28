import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L, {Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { DefaultLocation } from '../data/Locations';

const Map = () => {
  const [position, setPosition] = useState<[number, number]>(DefaultLocation);
  const [zoom, setZoom] = useState<number>(13);
  const mapRef = useRef<LeafletMap | null>(null);

  return (
    <MapContainer ref={mapRef} center={position} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;