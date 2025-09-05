import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { animate } from 'animejs';

// Remove default marker icon CSS so only emoji is shown
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: iconShadow
});

const emojiIcon = new L.DivIcon({
  html: '<div style="font-size: 2rem; line-height: 1;">📍</div>',
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const WeatherMap = ({ lat, lon, city, showMarkerEmoji, width = 400, height = 350, weather }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    console.log('mapRef.current:', mapRef.current);
    if (mapRef.current) {
      setTimeout(() => {
        animate(
          mapRef.current,
          {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 900,
            easing: 'easeOutExpo'
          }
        );
      }, 0);
    }
  }, [lat, lon]);

  if (!lat || !lon) return null;
  return (
    <div ref={mapRef} style={{ width, height, minWidth: 380, minHeight: 280, maxWidth: 600, maxHeight: 400, borderRadius: 18, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px #0001', margin: '0 auto' }}>
      <MapContainer key={`${lat},${lon}`} center={[lat, lon]} zoom={11} style={{ width: '100%', height: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[lat, lon]} icon={showMarkerEmoji ? emojiIcon : undefined}>
          <Popup>
            <div style={{ minWidth: 180, textAlign: 'center', fontFamily: 'inherit' }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{city}</div>
              {weather && (
                <>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} style={{ width: 48, height: 48 }} />
                  <div style={{ fontSize: 22, fontWeight: 500 }}>{Math.round(weather.main.temp)}°C</div>
                  <div style={{ textTransform: 'capitalize', color: '#555', fontSize: 14 }}>{weather.weather[0].description}</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Humidity: {weather.main.humidity}%</div>
                  <div style={{ fontSize: 13 }}>Wind: {weather.wind.speed} m/s</div>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
