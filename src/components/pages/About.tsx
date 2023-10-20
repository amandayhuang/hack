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
            >{`about`}</Typography>
            <Box mt={1}>
              <Typography>{`
                Phone a Friend connects volunteers with individuals at risk of
                  social isolation. Make one phone call a week and make a new
                  friend.
              `}</Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography
              variant="h5"
              className="section-header"
            >{`faq`}</Typography>
            <Box mt={1}>
              What does it cost?
              <li>Nothing! It's completely free and powered by volunteers.</li>
              <br />
              What's the commitment for volunteers?
              <li>
                30 minutes per week. We ask that you commit for at least 6
                months.
              </li>
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
