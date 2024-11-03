import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../utils/leaflet-config';

export const MapView: React.FC = () => {
  return (
    <MapContainer
      center={[-6.2088, 106.8456]} // Jakarta center
      zoom={13}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        
      />
      <ZoomControl position="topright" />
    </MapContainer>
  );
};