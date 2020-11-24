import React, { Component, useEffect } from "react";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  TableBody,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import store from "../../store";
import { Link } from "react-router-dom";
import { removeItem } from "../../actions/TimerActions";
import Typography from "@material-ui/core/Typography";
import { StyledTableCell, StyleTableRow } from "../../helperStyle/customStyles";
import { createBrowserHistory } from "history";
const { dispatch } = store;

const headerText = [
  "№",
  "Task",
  "Time start",
  "Time end",
  "Time spend",
  "Info",
  "Delete"
];

const TasksLog = ({ tasks, onDelete, onInfo }) => {
  useEffect(() => {
    const history = createBrowserHistory();
    history.push("/tab-log");
  });

  const TableBodyRow = (item, idx) => {
    return (
      <StyleTableRow key={item.id}>
        <TableCell component="th" scope="row">
          {idx + 1}
        </TableCell>
        <TableCell align="left">{item.name}</TableCell>
        <TableCell align="left">{item.timeStart}</TableCell>
        <TableCell align="left">{item.timeEnd}</TableCell>
        <TableCell align="left">{item.timeSpend}</TableCell>
        <TableCell align="left">
          <Button onClick={() => onInfo(item.id)} color="primary">
            <Link to={{ pathname: `/tasks/${item.id}`, state: item }}>
              Info
            </Link>
          </Button>
        </TableCell>
        <TableCell align="left">
          <Button
            onClick={() => onDelete(idx)}
            classes={{ root: "Button" }}
            variant="contained"
          >
            Delete
          </Button>
        </TableCell>
      </StyleTableRow>
    );
  };
  return (
    <TableContainer component={Paper} className="TableContainer">
      <Table aria-label="customized table">
        <TableHead className="table-head">
          <TableRow>
            {headerText.map((title, key) => (
              <StyledTableCell key={key} align="left">
                {title}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tasks.map(TableBodyRow)}</TableBody>
      </Table>
      {tasks.length === 0 ? (
        <Typography align="center" color="textSecondary" variant="h4">
          Your task list is empty
        </Typography>
      ) : (
        false
      )}
    </TableContainer>
  );
};
const mapStateToProps = ({ tasks }) => {
  return { tasks };
};
const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(removeItem(id));
    }
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(TasksLog);