import React, { useState, useEffect } from 'react';
import styles from './ipt.module.scss';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './icon-location.svg';



function App() {
  const mapRef = React.createRef();
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const fetchUserIP = async () => {
    try{
      const response=await fetch('https://api.ipify.org?format=json')
      const jsonData=await response.json();
      fetchData(jsonData.ip)
    }
    catch(error){
      console.error('Error fetching user IP:')
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_ZG2FZWE4PMrWqAAcOP6gescfjAGbg&ipAddress=${input}`
      );
      const jsonData = await response.json();
      setData(jsonData);
      const { lat, lng } = jsonData.location; // Access location directly from jsonData
      setCoordinates([lat, lng]);
      console.log(jsonData);
      console.log(jsonData.location.lat)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = () => {
    if (input !== '') {
      fetchData();
    } else {
      setData(null); // Clear the data if the input value is empty
    }
  };

  useEffect(() => {
    // Fix Leaflet marker icon path for React
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
    });
  }, []);
  
  
  useEffect(() => {
    fetchUserIP();
  },[]);

  useEffect(() => {
    console.log(coordinates);
    if (mapRef.current && coordinates) {
      mapRef.current.setView(coordinates, 13);
    }
  }, [coordinates]);
  

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["top"]}>
        <h2>IP Address Tracker</h2>
        <div className={styles["searchbar"]}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Search for any IP address or domain"
          />
          <button onClick={handleClick}>
            <img src="icon-arrow.svg" alt="" />
          </button>
        </div>
      </div>
      {data ?(
        <div className={styles["ipdata"]}>
          <span>
            <h5>IP ADDRESS</h5>
            <p>{data.ip}</p>
          </span>
          <span>
            <h5>LOCATION</h5>
            <p>
              {data.location.country}, {data.location.region}
              <span> {data.location.postalCode}</span>
            </p>
          </span>
          <span>
            <h5>TIMEZONE</h5>
            <p>{data.location.timezone}</p>
          </span>
          <span>
            <h5>ISP</h5>
            <p>{data.isp}</p>
          </span>
        </div>
      ) : (
        <div className={styles["ipdata"]}>
          <span>
            <h5>IP ADDRESS</h5>
            <p></p>
          </span>
          <span>
            <h5>LOCATION</h5>
            <p></p>
          </span>
          <span>
            <h5>TIMEZONE</h5>
            <p></p>
          </span>
          <span>
            <h5>ISP</h5>
            <p></p>
          </span>
        </div>
      )}
      <MapContainer
        center={coordinates}
        zoom={13}
        style={{ height: '70vh', width: '100%', zIndex: 'inherit', marginTop: '0px' }}
        ref={mapRef} // Assign the ref to the map container
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        />
        {coordinates && <Marker position={coordinates} />}
      </MapContainer>
    </div>
  );
}

export default App;
