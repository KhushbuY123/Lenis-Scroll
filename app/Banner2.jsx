'use client';
import React, { useEffect, useRef, useState } from 'react';

import { motion, useAnimation } from 'framer-motion';
import Lenis from 'lenis';
const StyledSvgContainer = styled(Box)({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Banner2 = () => {
  const BannerSvgRef2 = useRef(null);
  const svgRef = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const calculateProgress = () => {
      const container = scrollContainerRef2.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const totalScrollableDistance = containerRect.height;
        const progress = Math.min(
          Math.max(
            1 - (containerRect.bottom - 150) / totalScrollableDistance,
            0
          ),
          1
        );
        setProgress(progress);
      }
    };

    lenis.on('scroll', calculateProgress);
    window.addEventListener('resize', calculateProgress);

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      const paths = svg.querySelectorAll('.half_line');
      paths.forEach((path) => {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength * (1 - progress * 2);
      });
    }
    const svg2 = BannerSvgRef2.current;
    if (svg2) {
      const paths = svg2.querySelectorAll('.animated-path');
      paths.forEach((path) => {
        const pathLength = path.getTotalLength();

        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset =
          pathLength - pathLength * (progress - 0.5) * 2;
      });
    }
  }, [progress]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '150vh',
        zIndex: 40,
        background: 'blue',
      }}
      ref={scrollContainerRef2}
    >
      {/* Foreground Content */}
      <Box
        sx={{
          position: 'relative',
          width: '22em',
          height: '32em',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateY(50%)',
          color: 'white',
        }}
      >
        {/* SVG Path Animation */}
        <StyledSvgContainer>
          <svg
            ref={svgRef}
            width="500"
            height="700"
            viewBox="0 0 500 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="half_line"
              d="M250 1C350 2 495 36 500 350C505 650 400 700 250 700"
              stroke="#FF652D"
              strokeWidth="3"
            />
            <path
              className="half_line"
              d="M250 1C150 2 5 36 0 350C-5 650 100 700 250 700"
              stroke="#FF652D"
              strokeWidth="3"
            />
          </svg>
        </StyledSvgContainer>

        {/* Inner Text and Background */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '1em',
            left: '1em',
            right: '1em',
            top: '1em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#341212',
            p: 4,
          }}
        >
          {/* White Model SVG */}
          <StyledSvgContainer>
            <svg
              width="450"
              height="650"
              viewBox="0 0 450 650"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M450 325C450 525 375 650 225 650C75 650 0 525 0 325C0 125 75 0 225 0C375 0 450 125 450 325Z"
                fill="#FEFCF7"
                fillOpacity="0.9"
              />
            </svg>
          </StyledSvgContainer>
          <Box sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <Typography
              variant="h5"
              component="h5"
              fontWeight="bold"
              color="#341212"
            >
              Lorem ipsum
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 2 }}
              color="#341212"
              zIndex={30}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum
              similique dignissimos mollitia repudiandae atque quae porro in
              assumenda quam.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Second SVG */}
      <Box
        sx={{
          position: 'absolute',
          top: '61%',
          left: '47%',
        }}
        ref={BannerSvgRef2}
      >
        <svg
          width="532"
          height="1018"
          viewBox="0 0 532 1018"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            className="animated-path"
            d="M27.9999 1C153 295 -130.194 407.564 85.9999 464C210.5 496.5 287.5 612 251 881.5C214.5 1151 347.791 937.098 360.5 918.5C422 828.5 472.5 737.5 531 868"
            stroke="url(#g2)"
            strokeWidth="1.5"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <defs
          // style="stroke-dashoffset: 0.001; stroke-dasharray: none;"
          >
            <linearGradient
              id="g2"
              x1="266.372"
              y1="1"
              x2="266.372"
              y2="1016.56"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF652D"></stop>
              <stop offset="1" stopColor="#FEFCF7"></stop>
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </Box>
  );
};

export default Banner2;
