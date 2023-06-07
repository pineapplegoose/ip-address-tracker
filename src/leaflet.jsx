import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '/src/icon-location.svg';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function MapComponent({ ipAddress }) {
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
            const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ZG2FZWE4PMrWqAAcOP6gescfjAGbg&ipAddress=${ipAddress}`);
            const data = await response.json();
            const { lat, lng } = data.location;
            setCoordinates([lat, lng]);
            } 
            catch (error) {
            console.error('Error fetching coordinates:', error);
            }
    };

    if (ipAddress) {
        fetchCoordinates();
    }
    }, [ipAddress]);

    useEffect(() => {
        // Fix Leaflet marker icon path for React
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
        iconUrl: markerIcon
        });
    }, []);

    return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        />
        {coordinates && <Marker position={coordinates} />}
    </MapContainer>
    );
}

export default MapComponent;
