"use client";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

const Handpicked = () => {
  const HandpickedSvgRef = useRef(null);
  const vedioSvgRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScroll = scrollTop / (docHeight - windowHeight);
      setScrollOffset(totalScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updatePathAnimation = (svgRef, startOffset, endOffset) => {
      const svg = svgRef.current;
      if (svg) {
        const paths = svg.querySelectorAll(".animated-path");
        paths.forEach((path) => {
          const pathLength = path.getTotalLength();
          const progress = Math.min(
            Math.max(
              (scrollOffset - startOffset) / (endOffset - startOffset),
              0
            ),
            1
          );
          path.style.strokeDasharray = pathLength;
          path.style.strokeDashoffset = pathLength - pathLength * progress;
        });
      }
    };

    updatePathAnimation(HandpickedSvgRef, 0, 0.5); // First SVG animates from 0% to 50% scroll
    updatePathAnimation(vedioSvgRef, 0.5, 1); // Second SVG animates from 50% to 100% scroll
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
        zIndex: 0,
        background: "black",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          height: "28rem",
          width: "20rem",
          borderRadius: "50%",
          background: "white",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Lorem ipsum dolor sit amet
      </Box>
      <Box
        ref={HandpickedSvgRef}
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

export default Handpicked;
