import {
  Button,
  TableCell,
  TableRow,
  Tabs,
  withStyles
} from "@material-ui/core";

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

const StyleButton = withStyles(theme => ({
  root: {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)"
  }
}))(Button);

export { StyleTabs, StyledTableCell, StyleTableRow, StyleButton };
