import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { themeError } from "../../helperStyle/customTheme";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import {createBrowserHistory} from "history";
let history = createBrowserHistory();

const TaskInfoUndefined = () => {
  return (
    <Dialog open={true} fullWidth={"true"} maxWidth="md">
      <ThemeProvider theme={themeError}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are trying to get info about a non-existent task
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.back()} color="secondary" autoFocus>
            back
          </Button>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
};

export default TaskInfoUndefined;