import React, { Component } from "react";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
  Table
} from "@material-ui/core";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";
import store from "../../store";
const { dispatch } = store;

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#01bcd5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const headerText = [
  "№",
  "Task",
  "Time start",
  "Time end",
  "Time spend",
  "Info",
  "Delete"
];
const { removeTaskItem } = bindActionCreators(actions, dispatch);
class TasksLog extends Component {
  render() {
    const { tasks, removeTaskItem, onInfo } = this.props;
    const TableBodyRow = (item, idx) => {
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
              <Link to={{ pathname: `/tasks/:${item.id}`, state: item }}>
                Info
              </Link>
            </Button>
          </TableCell>
          <TableCell align="left">
            <Button onClick={() => removeTaskItem(item.id)}>Delete</Button>
          </TableCell>
        </TableRow>
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
      </TableContainer>
    );
  }
}
const mapStateToProps = ({ tasks }) => {
  return { tasks };
};
const mapDispatchToProps = dispatch => {
  return {
    removeTaskItem: id => {
      dispatch(removeTaskItem(id));
    },
    onInfo: taskItem => {
      dispatch.onInfo(taskItem);
    }
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(TasksLog);