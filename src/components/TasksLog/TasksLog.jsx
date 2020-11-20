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
import {TableBodyRow} from "../TableRow/TabRow";
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
     removeTaskItem(id);
    },
    onInfo: taskItem => {
      dispatch.onInfo(taskItem);
    }
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(TasksLog);