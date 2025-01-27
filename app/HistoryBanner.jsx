'use client';
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { motion, useAnimation } from 'framer-motion';
import Lenis from 'lenis';

const HistoryBanner = () => {
  const BannerSvgRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const controls = useAnimation(); // Framer Motion controls

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Smooth scrolling duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    });

    const handleScroll = (e) => {
      const scrollTop = lenis.scroll; // Lenis scroll progress
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Calculate normalized scroll progress (0 to 1)
      const totalScroll = scrollTop / (docHeight - windowHeight);
      setScrollOffset(totalScroll);
    };

    // Start Lenis and attach its scroll listener
    lenis.on('scroll', handleScroll);
    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const svg = BannerSvgRef.current;
    if (svg) {
      const paths = svg.querySelectorAll('.animated-path');
      paths.forEach((path) => {
        const pathLength = path.getTotalLength();
        const progress = Math.min(Math.max(scrollOffset * 3.2, 0), 1); // Adjust progress speed
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength - pathLength * progress;
      });
    }

    // Trigger Framer Motion animation
    controls.start({
      opacity: scrollOffset > 0.2 ? 1 : 0,
      y: scrollOffset > 0.2 ? 0 : 50,
    });
  }, [scrollOffset, controls]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        background: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '8rem',
          width: '8rem',
          borderRadius: '50%',
          background: 'blue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        2020
      </Box>

      <Box
        ref={BannerSvgRef}
        sx={{
          position: 'absolute',
          top: '57.5%',
          left: '47%',
        }}
      >
        <svg
          width="119"
          height="620"
          viewBox="0 0 119 620"
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
              y2="620"
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
