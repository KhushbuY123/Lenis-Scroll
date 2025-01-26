'use client';
import React from 'react';
import Box from '@mui/material/Box';

const HistoryBanner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        background: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 50,
      }}
    ></Box>
  );
};

export default HistoryBanner;
