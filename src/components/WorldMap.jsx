import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import React from "react";

const WorldMap = () => {
  const markers = [
    { coords: [31.230391, 121.473701], name: "Shanghai" },
    { coords: [28.70406, 77.102493], name: "Delhi" },
    { coords: [6.524379, 3.379206], name: "Lagos" },
    { coords: [35.689487, 139.691711], name: "Tokyo" },
    { coords: [23.12911, 113.264381], name: "Guangzhou" },
    { coords: [40.7127837, -74.0059413], name: "New York" },
    { coords: [34.052235, -118.243683], name: "Los Angeles" },
    { coords: [41.878113, -87.629799], name: "Chicago" },
    { coords: [51.507351, -0.127758], name: "London" },
    { coords: [40.416775, -3.70379], name: "Madrid" },
  ];
  return (
    <div style={{ height: 360 }}>
      <VectorMap
        map={worldMill}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        markers={markers}
        markerStyle={{
          initial: {
            fill: "#FF6767",
            stroke: "#FFFFFF",
            strokeWidth: 1,
          },
          hover: {
            fill: "#FF5722",
          },
        }}
        zoomOnScroll={true}
      />
    </div>
  );
};

export default WorldMap;
