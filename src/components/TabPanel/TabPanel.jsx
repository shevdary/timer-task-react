import React from 'react';
//material-ui
import { Typography } from '@material-ui/core';

export const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-0`}
      aria-labelledby={`simple-tab-0`}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
};