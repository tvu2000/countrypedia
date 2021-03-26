import React, { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Map({ setTooltipContent }) {
  return (
    <div>
      <ComposableMap
        data-tip=""
        style={{
          backgroundColor: "#1b1717",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                onMouseOver={() => {
                  setTooltipContent(geo.properties.NAME);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    fill: "#f0c929",
                    outline: "none",
                    stroke: "#FFFFFF",
                    strokeWidth: "0.9",
                  },
                  hover: {
                    fill: "grey",
                    stroke: "black",
                    outline: "#184d47",
                  },
                  pressed: {
                    fill: "#96bb7c",
                    outline: "none",
                  },
                }}
                key={geo.rsmKey}
                geography={geo}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default memo(Map);
