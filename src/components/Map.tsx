import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEvacuationSpace } from '../api/useEvacuationSpace';
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { DefaultLocation } from '../data/Locations';
import { MarkerData } from '../types/types';


const Map = () => {
  const [position, setPosition] = useState<[number, number]>(DefaultLocation);
  const [zoom, setZoom] = useState<number>(13);
  const markerData: MarkerData[] = useEvacuationSpace();
  const mapRef = useRef<LeafletMap | null>(null);

  const updatedAt = markerData[0] ? markerData[0].updated_at : '';
  const attribution = `安芸高田市避難所マップ<br/>最終更新日:${updatedAt}<br/>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors<br/>`;

  return (
    <MapContainer ref={mapRef} center={position} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution={attribution}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;