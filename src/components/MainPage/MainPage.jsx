import React, {Component} from 'react';
import Timer from "../Timer/Timer";
import TasksLog from "../TasksLog/TasksLog";
import TaskTab from "../TasksTab/TaskTab";

class MainPage extends Component {
    render() {
        return (
            <div>
                <Timer/>
                <TaskTab/>
            </div>
        );
    }
}


export default MainPage;
