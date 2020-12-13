import React, { useState } from 'react';

// redux
const { dispatch } = store;
import { connect } from 'react-redux';
import * as actions from '../../redux/reducers/tasks';
import { bindActionCreators } from 'redux';
const { removeTask, updateTasks } = bindActionCreators(actions, dispatch);
import store from '../../redux/store';

// components
import { AlertDelete } from '../AlertWindow/AlertDialogDelete';

// material-ui
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  TableBody,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {
  StyleButton,
  StyledTableCell,
  StyleTableRow,
} from '../../material/customStyles';

// utils
import { tableHeader } from '../../utils/tableHeader';
import { useHistory } from 'react-router-dom';

const TasksLog = ({ tasks, removeTask }) => {
  const [isOpen, setOpen] = useState(false);
  const [deleteId, setId] = useState(null);
  const history = useHistory();

  const handleGetInfo = (id) => {
    history.push(`/tasks/${id}`);
  };

  const handleClick = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    removeTask(deleteId);
    setOpen(false);
  };

  const TableBodyRow = (taskItem) => {
    return (
      <StyleTableRow key={taskItem.id}>
        <TableCell component="th" scope="row">
          {taskItem.id}
        </TableCell>
        <TableCell align="left" width="30%">
          <Typography style={{ wordWrap: 'break-word' }}>
            {taskItem.name}
          </Typography>
        </TableCell>
        <TableCell align="left">{taskItem.startTime}</TableCell>
        <TableCell align="left">{taskItem.endTime}</TableCell>
        <TableCell align="left">{taskItem.durationTime}</TableCell>
        <TableCell align="left">
          <StyleButton
            color="primary"
            onClick={() => handleGetInfo(taskItem.id)}
          >
            Info
          </StyleButton>
        </TableCell>
        <TableCell align="left">
          <StyleButton color="primary" onClick={() => handleClick(taskItem.id)}>
            Delete
          </StyleButton>
        </TableCell>
      </StyleTableRow>
    );
  };
  return (
    <div>
      <TableContainer component={Paper} className="TableContainer">
        <Table aria-label="customized table">
          <TableHead className="table-head">
            <TableRow>
              {tableHeader.map((title, key) => (
                <StyledTableCell key={key} align="left">
                  {title}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{tasks ? tasks.map(TableBodyRow) : true}</TableBody>
        </Table>
        {tasks.length === 0 ? (
          <Typography align="center" color="textSecondary" variant="h4">
            Your task list is empty
          </Typography>
        ) : (
          false
        )}
      </TableContainer>
      <AlertDelete
        open={isOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
        deleteId={deleteId}
      />
    </div>
  );
};

export default connect(
  ({ tasks: { tasks } }) => ({
    tasks,
  }),
  { removeTask }
)(TasksLog);
