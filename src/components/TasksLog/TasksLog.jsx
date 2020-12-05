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

import Typography from "@material-ui/core/Typography";
import {
    StyleButton,
    StyledTableCell,
    StyleTableRow
} from "../../helperStyle/customStyles";

import store from "../../redux/store";
import { AlertDelete } from "../AlertWindow/AlertDialogDelete";

import {cleanTasks, removeTask, updateTasks} from "../../redux/reducers/tasks";
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


const TasksLog = ({ tasks, history,onDelete }) => {
    const [isOpen, setOpen] = useState(false);
    const [deleteId, setId] = useState(null);

    useEffect(() => {
        history.push("/tasks");
    }, [tasks]);

    const handleGetInfo = id => {
        history.push(`/tasks/${id}`);
    };

    const handleClick = id => {
        setOpen(true);
        setId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        onDelete(deleteId) ;
        setOpen(false);
    };

    const TableBodyRow = (item, idx) => {
        return (
            <StyleTableRow key={item.id}>
                <TableCell component="th" scope="row">
                    {idx + 1}
                </TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.startTime}</TableCell>
                <TableCell align="left">{item.endTime}</TableCell>
                <TableCell align="left">{item.spendTime}</TableCell>
                <TableCell align="left">
                    <StyleButton color="primary" onClick={() => handleGetInfo(item.id)}>
                        Info
                    </StyleButton>
                </TableCell>
                <TableCell align="left">
                    <StyleButton color="primary" onClick={() => handleClick(item.id)}>
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
                    <TableBody>{tasks ? tasks.map(TableBodyRow) : true}</TableBody>
                </Table>
                {tasks.length === 0 ? (
                    <Typography align="center" color="textSecondary" variant="h4">
                        Your task list is empty
                    </Typography>
                ) : (
                    false
                )}
            </TableContainer>
            <AlertDelete
                open={isOpen}
                handleClose={handleClose}
                handleDelete={handleDelete}
                deleteId={deleteId}
            />
        </div>
    );
};
const mapStateToProps = (state) => {
    return { tasks: state.tasksReducer.tasks };
};
const mapDispatchToProps = dispatch => {
    return {
        onDelete:(deleteId)=>{dispatch(removeTask(deleteId))},
        onUpdateList: (tasks) => {dispatch(updateTasks(tasks))},

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TasksLog);
