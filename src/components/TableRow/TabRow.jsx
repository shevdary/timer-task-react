import { TableCell, TableRow, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import React from "react";


const StyleTableRow = withStyles(theme => ({
    root: {
        backgroundColor: "#eaf6ff"
    }
}))(TableRow);

const TableBodyRow=(item,idx,onDelete,onInfo)=>{
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
                <Button onClick={()=>this.props.onInfo(item.id)}>
                    {/*<Link to={{ pathname: `/tasks/${item.id}`, state: item }}>Info</Link>*/}
                </Button>
            </TableCell>
            <TableCell align="left">
                <Button onClick={() => onDelete(item.id)}>Delete</Button>
            </TableCell>
        </StyleTableRow>
    )
}

export default TableBodyRow;