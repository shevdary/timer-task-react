import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { themeError } from "../../helperStyle/customTheme";

export const AlertDialog = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog open={open} fullWidth={"true"} maxWidth="md">
        <ThemeProvider theme={themeError}>
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h6" color="primary">
              Empty task name
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are trying close your task without name, enter the title and
              try again!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" autoFocus>
              close
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
};
