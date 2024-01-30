"use client";

import { Icon, LatLngTuple, Map as TMap } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

type Props = {
  targetCoords: LatLngTuple;
  driverCoords: LatLngTuple;
};

const Map: React.FC<Props> = ({ targetCoords, driverCoords }) => {
  const [targetPos, setTargetPos] = useState<LatLngTuple>(targetCoords);
  const [driverPos, setDriverPos] = useState<LatLngTuple>(driverCoords);
  const [map, setMap] = useState<TMap | null>(null);
  const icon = new Icon({
    iconSize: [24, 24],
    iconUrl:
      "https://freepngimg.com/thumb/map/66931-map-google-icons-maps-computer-marker-maker.png",
  });

  const iconDriver = new Icon({
    iconSize: [34, 34],
    iconUrl:
      "https://hoclaixeb2hanoi.com/wp-content/uploads/2022/04/bao-nhieu-tuoi-duoc-thi-bang-lai-xe-may-02.png",
  });

  useEffect(() => {
    setTargetPos(targetCoords);
  }, [targetCoords]);

  useEffect(() => {
    setDriverPos(driverCoords);
  }, [driverCoords]);

  useEffect(() => {
    if (map) {
      // map.flyTo(driverCoords, map.getZoom());
    }
  }, [driverCoords, map]);

  useEffect(() => {
    if (!map) return;
  }, [map]);

  return (
    <MapContainer
      style={{ width: "100%", height: "500px" }}
      zoom={17}
      scrollWheelZoom={true}
      whenCreated={setMap}
      center={driverCoords}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={targetCoords} icon={icon}>
        <Popup></Popup>
      </Marker>
      <Marker position={driverCoords} icon={iconDriver}>
        <Popup></Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
