import React, { useState } from 'react';
// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
// history
import { useHistory } from 'react-router-dom';

const TaskInfoUndefined = () => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const handleCloseAlert = () => {
    setIsOpen(false);
    history.replace('/tasks');
  };

  return (
    <Dialog open={isOpen} fullWidth="true" maxWidth="md">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are trying to get info about a non-existent task
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAlert} color="secondary" autoFocus>
          back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskInfoUndefined;
