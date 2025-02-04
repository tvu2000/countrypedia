import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import dataJSON from "./../data/country.json";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleQuantile()
  .domain([1000, 250000000])
  .range([
    "#ffd5cc",
    "#ff9580",
    "#ff6a4d",
    "#ff2b00",
    "#cc2200",
    "#991a00",
    "#661100",
  ]);
// console.log(colorScale.invertExtent("#ff401a"));
// console.log(colorScale.invert("#4d0d00"));
const MapDensity = ({ setContent, setHover, setContentCode }) => {
  return (
    <ComposableMap
      style={{ margin: "0px" }}
      projectionConfig={{ scale: 150 }}
      data-tip=""
    >
      <Graticule stroke="#eeebdd" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const population =
              typeof dataJSON[geo.properties.ISO_A2] === "object"
                ? dataJSON[geo.properties.ISO_A2]["Population2019"]
                : 0;
            // console.log(population);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={
                  population == 0
                    ? "#F5F4F6"
                    : population > 1000000000
                    ? "#330900"
                    : colorScale(population)
                }
                onMouseOver={() => {
                  setContent(geo.properties.NAME);
                  setHover(true);
                  setContentCode(geo.properties.ISO_A2);
                }}
                onMouseLeave={() => {
                  setContent("");
                  setHover(false);
                  setContentCode("");
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapDensity;
// "WF": "Mata Utu",
// "BL": "Gustavia",
