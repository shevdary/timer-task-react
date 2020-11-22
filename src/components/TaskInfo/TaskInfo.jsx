import React, {Component, useEffect} from 'react';
import { connect } from "react-redux";
import {Grid,Typography,Chip,Divider,Button,makeStyles} from "@material-ui/core";
import {createBrowserHistory} from "history";
let history = createBrowserHistory();
/*import {useHistory} from 'react-router-dom';*/
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
}));
class TaskInfo extends Component{
    render() {
        const {tasksId,tasks}=this.props;

        const info = tasks.find(item=>item.id==tasksId);
        const details=info==undefined?<div>Такой страницы не существует
                <button onClick={()=>history.back()}>go back</button></div>:
            <div>
                <div >
                    <div >
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {info.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider variant="middle" />
                    <div >
                        <Typography gutterBottom variant="body1">
                        </Typography>
                        <Grid item xs>
                            <Typography gutterBottom variant="h6">
                                time spend : {info.timeSpend}
                            </Typography>
                        </Grid>
                    </div>
                    <Divider variant="middle" />
                    <div >
                        <Typography gutterBottom variant="body1">
                        </Typography>
                        <Grid item xs>
                            <Typography gutterBottom variant="h6">
                                time start : {info.timeStart}
                            </Typography>
                        </Grid>
                    </div>
                </div>
            </div>
        return (
            <div>
                <button onClick={()=>history.back()}>Back</button>
                {details}
            </div>

        );
    }


}

const mapStateToProps = state => {
    return{tasks: state.tasks}
};
export default connect(mapStateToProps)(TaskInfo); {/*   */}