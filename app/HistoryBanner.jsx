"use client";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

const HistoryBanner = () => {
  const BannerSvgRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // How much the user has scrolled vertically
      const windowHeight = window.innerHeight; // Height of the visible part of the page
      const docHeight = document.documentElement.scrollHeight; // Total height of the page

      // Calculate total scroll progress as a value between 0 and 1
      const totalScroll = scrollTop / (docHeight - windowHeight);
      setScrollOffset(totalScroll); // Save this value to state
    };

    // Attach the `scroll` event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updatePathAnimation = (svgRef, startOffset, endOffset) => {
      const svg = svgRef.current; // Access the SVG element
      if (svg) {
        const paths = svg.querySelectorAll(".animated-path"); // Find paths with the "animated-path" class
        paths.forEach((path) => {
          const pathLength = path.getTotalLength(); // Get the total length of the path
          const progress = Math.min(
            Math.max(
              (scrollOffset - startOffset) / (endOffset - startOffset),
              0
            ),
            1
          ); // Normalize progress between 0 and 1

          // Update path animation
          path.style.strokeDasharray = pathLength; // Set the length of the stroke
          path.style.strokeDashoffset = pathLength - pathLength * progress; // Adjust based on progress
        });
      }
    };

    updatePathAnimation(BannerSvgRef, 0, 0.5); // Trigger the animation
  }, [scrollOffset]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
        background: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          height: "8rem",
          width: "8rem",
          borderRadius: "50%",
          background: "blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        2020
      </Box>

      <Box
        ref={BannerSvgRef}
        sx={{
          position: "absolute",
          top: "58.5%",
          left: "47%",
        }}
      >
        <svg
          width="119"
          height="715"
          viewBox="0 0 119 715"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            className="animated-path"
            d="M48.0001 0.999998C48.0001 0.999998 11.5003 53.5 25.5003 132C39.5003 210.5 86.5022 217 115.501 317C144.5 417 -97.9997 496.5 49 714"
            stroke="url(#g1)"
            strokeWidth="2"
          ></path>
          <defs>
            <linearGradient
              id="g1"
              x1="59.3098"
              y1="0.999997"
              x2="59.3098"
              y2="714"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FEFCF7"></stop>
              <stop offset="1" stopColor="#FF652D"></stop>
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </Box>
  );
};

export default HistoryBanner;
