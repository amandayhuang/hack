import React from "react";
import PageWrapper from "../pages/PageWrapper";
import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <PageWrapper>
      <Box display="flex" justifyContent="center">
        <Box className="sizing">
          <Box mb={2}>
            <Typography
              variant="h5"
              className="section-header"
            >{`testing`}</Typography>
            <Box mt={1}>
              <Typography>{`
                testing
              `}</Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography
              variant="h5"
              className="section-header"
            >{`section 1`}</Typography>
            <Box mt={1}>
              <ul>
                <li>First</li>
                <li>Second</li>
              </ul>
            </Box>
          </Box>

          <Box mb={2}>
            <Typography
              variant="h5"
              className="section-header"
            >{`contact`}</Typography>
            <Box mt={1}>
              <Typography>{`ayh@ohmanda.com`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default About;
