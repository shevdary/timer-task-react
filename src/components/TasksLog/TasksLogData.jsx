import React from 'react';
import { StyleButton, StyleTableRow } from '../../material/customStyles';
import { useHistory } from 'react-router-dom';

import { TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const TasksLogData = ({ taskItem, handleClick }) => {
  const history = useHistory();

  const handleGetInfo = (id) => {
    history.push(`/tasks/${id}`);
  };

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
        <StyleButton color="primary" onClick={() => handleGetInfo(taskItem.id)}>
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

export default TasksLogData;