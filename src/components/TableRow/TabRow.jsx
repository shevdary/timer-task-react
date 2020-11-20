import { TableCell, TableRow } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import React from "react";

export const TableBodyRow = (item, idx, removeTaskItem) => {
  return (
    <TableRow key={item.id}>
      <TableCell component="th" scope="row">
        {idx + 1}
      </TableCell>
      <TableCell align="left">{item.name}</TableCell>
      <TableCell align="left">{item.timeStart}</TableCell>
      <TableCell align="left">{item.timeEnd}</TableCell>
      <TableCell align="left">{item.timeSpend}</TableCell>
      <TableCell align="left">
        <Button>
          <Link to={{ pathname: `/tasks/:${item.id}`, state: item }}>Info</Link>
        </Button>
      </TableCell>
      <TableCell align="left">
        <Button onClick={() => removeTaskItem(item.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};