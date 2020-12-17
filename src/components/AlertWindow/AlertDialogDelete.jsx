import React from 'react';
// material-ui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from '@material-ui/core';

export const AlertDelete = ({ open, handleClose, handleDelete, deleteId }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
        <DialogTitle id="alert-dialog-title">
          Delete the task {deleteId}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};





