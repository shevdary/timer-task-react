import React, {Component} from 'react';
import Timer from "../Timer/Timer";
import TasksLog from "../TasksLog/TasksLog";

class MainPage extends Component {
    render() {
        return (
            <div>
                <Timer/>
                <TasksLog/>
            </div>
        );
    }
}


export default MainPage;
