import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEvacuationSpace } from '../api/useEvacuationSpace';
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { DefaultLocation } from '../data/Locations';
import { MarkerData } from '../types/types';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MAP_ICON = L.icon({
  iconUrl: './images/leaflet/map_marker_icon.png',
  iconSize: [80, 80],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

const Map = () => {
  const [position, setPosition] = useState<[number, number]>(DefaultLocation);
  const [zoom, setZoom] = useState<number>(13);
  const markerData: MarkerData[] = useEvacuationSpace();
  const mapRef = useRef<LeafletMap | null>(null);

  const updatedAt = markerData[0] ? markerData[0].updated_at : '';
  const attribution = `安芸高田市避難所マップ<br/>最終更新日:${updatedAt}<br/>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors<br/>`;

  return (
    <>
      <MapContainer ref={mapRef} center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution={attribution}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          markerData.map((data, index) => (
            <Marker key={index} position={[data.lat, data.long]} icon={MAP_ICON}>
              <Popup>
                <div>
                  <h3>{data.name}</h3>
                  <p>{data.address}</p>
                  <p><a href={`tel:${data.tel}`} className="tel">{data.tel}</a></p>
                  {data.otasuke_phone && <p>お助けフォン：{data.otasuke_phone}</p>}
                  <p>{data.capacity}人</p>
                </div>
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </>
  );
};

export default Map;