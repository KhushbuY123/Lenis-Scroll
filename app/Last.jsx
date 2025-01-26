import { Box } from "@mui/material";
import React from "react";

export const Last = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100vh",
        position: "relative",
        background: "slategray",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          height: "150px",
          width: "150px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        hi
      </Box>
    </Box>
  );
};
