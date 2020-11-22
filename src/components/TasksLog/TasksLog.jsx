import React, { Component } from "react";
import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    withStyles,
    Table,
    TableBody
} from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";
import store from "../../store";
import { TableBodyRow } from "../TableRow/TabRow";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {removeItem} from "../../actions/TimerActions";
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

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#ffffff",
        color: theme.palette.text.disabled,
        fontSize: 12
    },
    body: {
        fontSize: 14
    }
}))(TableCell);
const  TasksLog =({tasks,onDelete, onInfo })=> {
    const renderRow=(item,idx)=>{
       return(
           <StyleTableRow key={item.id}>
               <TableCell component="th" scope="row">
                   {idx + 1}
               </TableCell>
               <TableCell align="left">{item.name}</TableCell>
               <TableCell align="left">{item.timeStart}</TableCell>
               <TableCell align="left">{item.timeEnd}</TableCell>
               <TableCell align="left">{item.timeSpend}</TableCell>
               <TableCell align="left">
                   <Button onClick={()=>onInfo(item.id)}>
                       {/*<Link to={{ pathname: `/tasks/${item.id}`, state: item }}>Info</Link>*/}
                   </Button>
               </TableCell>
               <TableCell align="left">
                   <Button onClick={() => onDelete(item.id)}>Delete</Button>
               </TableCell>
           </StyleTableRow>
       )
    }
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
                    <TableBody>{tasks.map(renderRow)}</TableBody>
                </Table>
            </TableContainer>
        );
}
const mapStateToProps = ({ tasks }) => {
    return { tasks };
};
const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(removeItem(id));
        },
        onInfo: taskItem => {
            console.log(taskItem,'id');
        }
    };
};


const StyleTableRow = withStyles(theme => ({
    root: {
        backgroundColor: "#eaf6ff"
    }
}))(TableRow);



export default connect(mapStateToProps,mapDispatchToProps)(TasksLog);