import {TableCell, TableRow, Tabs, withStyles} from "@material-ui/core";

const StyleTabs = withStyles(theme => ({
    root: {
        backgroundColor: "#01bcd5"
    }
}))(Tabs);
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
const StyleTableRow = withStyles(theme => ({
    root: {
        backgroundColor: "#eaf6ff"
    }
}))(TableRow);
export {StyleTabs,StyledTableCell,StyleTableRow };