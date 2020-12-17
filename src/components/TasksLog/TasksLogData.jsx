import React from 'react';
import { useHistory } from 'react-router-dom';
//  material ui
import { TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { v4 as uuid } from 'uuid';
import { StyleButton, StyleTableRow } from '../../material/customStyles';
//  other

const TasksLogData = ({ taskItem, handleClick }) => {
  const {
    id, name, startTime, endTime, durationTime,
  } = taskItem;
  const history = useHistory();

  const handleGetInfo = (taskId) => {
    history.push(`/tasks/${taskId}`);
  };

  return (
    <StyleTableRow key={uuid()}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="left" width="30%">
        <Typography style={{ wordWrap: 'break-word' }}>{name}</Typography>
      </TableCell>
      <TableCell align="left">{startTime}</TableCell>
      <TableCell align="left">{endTime}</TableCell>
      <TableCell align="left">{durationTime}</TableCell>
      <TableCell align="left">
        <StyleButton color="primary" onClick={() => handleGetInfo(id)}>
          Info
        </StyleButton>
      </TableCell>
      <TableCell align="left">
        <StyleButton color="primary" onClick={() => handleClick(id)}>
          Delete
        </StyleButton>
      </TableCell>
    </StyleTableRow>
  );
};

export default TasksLogData;
