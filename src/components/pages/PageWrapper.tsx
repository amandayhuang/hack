import React, { useEffect } from "react";
import AppBar from "../../components/AppBar";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AppBar />
      <Box m={2}>{children}</Box>
    </>
  );
};

export default PageWrapper;
