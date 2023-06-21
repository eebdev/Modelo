import React, { useEffect, useRef, useState } from "react";
import { Icon, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import useMarkerCluster from "../hooks/useMarkerCluster";
import { Coordinates } from "@ctypes/types";

function ChangeView({ setStationID }: { setStationID: Function }) {
  const map = useMapEvents({
    moveend: () => {
      const newCenter = map.getCenter();
      
      // Call the API with the new center
      fetchNearestStation(newCenter.lat, newCenter.lng, setStationID);
    },
  });

  return null;
}

const weatherStationIcon = L.icon({
  iconUrl: "/icons/weather-station.svg",
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5],
});

function fetchNearestStation(lat: number, lon: number, setStationID: Function) {
  fetch(`/api/getNearestStation?lon=${lon}&lat=${lat}`)
    .then(res => res.json())
    .then(data => {
      // Assuming the API response contains an ID property
      if (data && data.data) {
        setStationID(data.data);
      }
    })
    .catch(err => console.error(err));
}

const CoordinatesMap = ({
  defaultCenter,
  defaultZoom,
  setStationID,
}: {
  defaultCenter: LatLngExpression;
  defaultZoom: number;
  setStationID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates>([]);
  const [center, setCenter] = useState<LatLngExpression>(defaultCenter);

  return (
    <div className=" h-80 ">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView setStationID={setStationID} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates.length > 0 && (
          <MapMarkers coordinates={coordinates} icon={weatherStationIcon} />
        )}
      </MapContainer>
    </div>
  );
};

const MapMarkers = ({
  coordinates,
  icon,
}: {
  coordinates: Coordinates;
  icon: Icon;
}) => {
  // useMarkerCluster(coordinates, icon);
  return null;
};

export default CoordinatesMap;
