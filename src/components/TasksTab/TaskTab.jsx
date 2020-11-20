import React, { Component } from "react";
import TasksLog from "../TasksLog/TasksLog";
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  withStyles
} from "@material-ui/core";
import {Button,Grid} from "@material-ui/core";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#01bcd5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12

  }
}))(Box);

class TaskTab extends Component {
  render() {
    return (
        <StyledTableCell flexDirection="row" justifyContent="center">
            <Button>
                {" "}
                <TasksLog />
            </Button>
            <Button>
                second
            </Button>
        </StyledTableCell>

    );
  }
}

export default TaskTab;
/*<StyledTableCell flexDirection="row" justifyContent="center">
 <Button>
 {" "}
 <TasksLog />
 </Button>
 <Button>
 second
 </Button>
 </StyledTableCell>*/