import React, { useEffect, useState } from "react";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  TableBody,
  Link
} from "@material-ui/core";
import { connect } from "react-redux";
import { removeItem } from "../../actions/TimerActions";
import Typography from "@material-ui/core/Typography";
import {
  StyleButton,
  StyledTableCell,
  StyleTableRow
} from "../../helperStyle/customStyles";
import { createBrowserHistory } from "history";
import { Redirect } from "react-router";
import TaskInfo from "../TaskInfo/TaskInfo";
const history = createBrowserHistory();
const headerText = [
  "№",
  "Task",
  "Time start",
  "Time end",
  "Time spend",
  "Info",
  "Delete"
];

const TasksLog = ({ tasks,history }) => {
  const [storage, setStorage] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    history.push("/tab-log");
    if (JSON.parse(localStorage.getItem("tasksData"))) {
      setStorage(JSON.parse(localStorage.getItem("tasksData")));
    }
  }, [tasks, update]);

  const onClick = id => {
    let storageList = JSON.parse(localStorage.getItem("tasksData"));
    localStorage.setItem(
      "tasksData",
      JSON.stringify(storageList.filter(item => item.id !== id))
    );
    setUpdate(!update);
  };
const onClicks=()=>{


}
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
          <StyleButton
            color="primary"
            component={Link}
            onClick={onClicks(item.id)}
            to={{ pathname: `tasks/${item.id}`, state: item }}
          >
            Info
          </StyleButton>
        </TableCell>
        <TableCell align="left">
          <StyleButton color="primary" onClick={() => onClick(item.id)}>
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
              {headerText.map((title, key) => (
                <StyledTableCell key={key} align="left">
                  {title}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{storage ? storage.map(TableBodyRow) : true}</TableBody>
        </Table>
        {tasks.length === 0 && storage[0] == null ? (
          <Typography align="center" color="textSecondary" variant="h4">
            Your task list is empty
          </Typography>
        ) : (
          false
        )}
      </TableContainer>
    </div>
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