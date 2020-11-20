import React from "react";
import { Box, Typography } from "@material-ui/core";

export const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
};