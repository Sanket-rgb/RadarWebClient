import { useEffect, useRef } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import WebSocketConnection from "../lib/WebSocketConnection";
import MapDrawings from "./MapDrawings";
import MapParent from "./MapParent";

const DrawingsComponent = () => {
  const map = useMap();
  const mapParentInstance = MapParent.getInstance();
  mapParentInstance.initMap(map);
  return null;
};

const MapComponent = () => {
  //   useEffect(() => {
  //     const connection = new WebSocketConnection("WS_URL_HERE");
  //     connection.connect();

  //     connection.addListener("message", (message: object) => {
  //       console.log("Received message:", message);
  //     });

  //     connection.send({ type: "ping" });

  //     return () => {
  //       connection.close();
  //     };
  //   }, []);

  //   return <div>Hello, World!</div>;
  // };

  return (
    <MapContainer
      center={[60.1811, 24.8317]}
      zoom={20}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ height: "100%", position: "relative" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <DrawingsComponent />
      {/* <CircleMarker center={[51.51, -0.12]} pathOptions={redOptions} radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker> */}
      {/* <MouseDebug />
      <Markers /> */}
    </MapContainer>
  );
};

export default MapComponent;
