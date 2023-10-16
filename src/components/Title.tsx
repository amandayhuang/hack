import React from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="center" onClick={() => navigate("/")}>
      <Box mr={1}>
        <Typography className="wwc-title yellow">{`{`}</Typography>
      </Box>
      <Typography className="wwc-title">{`testing`}</Typography>
      <Box ml={1}>
        <Typography className="wwc-title yellow">{`}`}</Typography>
      </Box>
    </Box>
  );
};

export default Title;
