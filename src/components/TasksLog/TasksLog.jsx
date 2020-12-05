import React, { useEffect, useState } from 'react';
//redux
const { dispatch } = store;
import { connect } from 'react-redux';
import * as actions from '../../redux/reducers/tasks';
import { bindActionCreators } from 'redux';
const { removeTask, updateTasks } = bindActionCreators(actions, dispatch);
import store from '../../redux/store';
//components
import { AlertDelete } from '../AlertWindow/AlertDialogDelete';
//material-ui
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
//utils
import { headerTable } from '../../utils/headerTable';

const TasksLog = ({ tasks, history, onDelete }) => {
  const [isOpen, setOpen] = useState(false);
  const [deleteId, setId] = useState(null);

  useEffect(() => {
    history.push('/tasks');
  }, [tasks]);

  const handleGetInfo = id => {
    history.push(`/tasks/${id}`);
  };

  const handleClick = id => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(deleteId);
    setOpen(false);
  };

  const TableBodyRow = (item, idx) => {
    return (
      <StyleTableRow key={item.id}>
        <TableCell component="th" scope="row">
          {item.id}
        </TableCell>
        <TableCell align="left">{item.name}</TableCell>
        <TableCell align="left">{item.startTime}</TableCell>
        <TableCell align="left">{item.endTime}</TableCell>
        <TableCell align="left">{item.durationTime}</TableCell>
        <TableCell align="left">
          <StyleButton color="primary" onClick={() => handleGetInfo(item.id)}>
            Info
          </StyleButton>
        </TableCell>
        <TableCell align="left">
          <StyleButton color="primary" onClick={() => handleClick(item.id)}>
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
              {headerTable.map((title, key) => (
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
const mapStateToProps = state => {
  return { tasks: state.tasksReducer.tasks };
};
const mapDispatchToProps = dispatch => {
  return {
    onDelete: deleteId => {
      removeTask(deleteId);
    },
    onUpdateList: tasks => {
      updateTasks(tasks);
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TasksLog);
