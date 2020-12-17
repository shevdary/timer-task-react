import React from 'react';
import { StyleButton, StyleTableRow } from '../../material/customStyles';
import { useHistory, useLocation } from 'react-router-dom';

import { TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const TasksLogData = ({ taskItem, handleClick }) => {
  const history = useHistory();
  const { id, name, startTime, endTime, durationTime } = taskItem;
  const handleGetInfo = (id) => {
    history.push(`/tasks/${id}`);
  };

  return (
    <StyleTableRow key={id}>
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
