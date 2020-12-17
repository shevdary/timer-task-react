import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  Paper,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { v4 as uuid } from 'uuid';
import { removeTask } from '../../redux/reducers/tasks';
// components
import { AlertDelete } from '../AlertWindow/AlertDialogDelete';
import TasksLogData from './TasksLogData';
// material-ui
import { StyledTableCell } from '../../material/customStyles';
// other
import { tableHeader } from '../../utils/tableHeader';

const TasksLog = ({ tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    setIsOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    dispatch(removeTask(deleteId));
    setIsOpen(false);
  };
  return (
    <div>
      <TableContainer component={Paper} className="TableContainer">
        <Table aria-label="customized table">
          <TableHead className="table-head">
            <TableRow>
              {tableHeader.map((title) => (
                <StyledTableCell key={uuid()} align="left">
                  {title}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              && tasks.map((tasksData) => (
                <TasksLogData
                  key={uuid()}
                  taskItem={tasksData}
                  handleClick={handleClick}
                />
              ))}
          </TableBody>
        </Table>
        {tasks.length === 0 && (
          <Typography align="center" color="textSecondary" variant="h4">
            Your task list is empty
          </Typography>
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

export default connect(({ tasks: { tasks } }) => ({
  tasks,
}))(TasksLog);
