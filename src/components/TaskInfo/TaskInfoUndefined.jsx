import React from 'react';

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

// history
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

const TaskInfoUndefined = () => {
  return (
    <Dialog open={true} fullWidth={'true'} maxWidth="md">
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
    </Dialog>
  );
};

export default TaskInfoUndefined;