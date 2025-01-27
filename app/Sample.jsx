"use client";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRef, useEffect } from "react";

const HistoryBanner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
        background: "slategray",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          height: "70%",
          width: "25%",
          borderRadius: "80%",
        }}
      >
        hi
      </Box>
      <Box
        className="line l_d desktop_only"
        sx={{
          top: "0",
          left: "35%",
          position: "absolute",
        }}
      >
        <svg
          width="749"
          height="981"
          viewBox="0 0 649 1081"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M648 1C643.667 96.6667 580.707 261.4 367.5 231C118.5 195.496 1 272 1 506.5C1 741 28.5001 798 161.5 853.5C298.153 910.524 286.999 1005.42 265 1032C253 1046.5 239.5 1059 243 1080"
            stroke="#341212"
            strokeWidth="1.5"
            style={{
              strokeDashoffset: "0.000552",
              strokeDasharray: "750.522px, 924.177px",
            }}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default HistoryBanner;
