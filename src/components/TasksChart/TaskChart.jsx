import React, { Component} from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import Timer from "../Timer/Timer";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.renderTable();
  }
  renderTable = () => {
    const { data } = this.state;
    const date = data;
    for (let i = 0; i < 24; i++) {
      date.push({ name: i, minutes: localStorage.getItem("count") });
    }
    this.setState({ date: date });
  };

  componentDidMount() {
    const history = createBrowserHistory();
    history.push("/tab-chart");
    this.onCharts();
  }

  onCharts = () => {
    const { data } = this.state;
    const { tasks } = this.props;
    let copyData = data;
    let newArrayTime = [];
    let start, end;
    if (tasks.length != 0) {
      tasks.map(item => {
        newArrayTime.push([item.timeStart.split(":"), item.timeEnd.split(":")]);
      });

    let getIndexLastElement = newArrayTime[newArrayTime.length - 1];
    let timeStartHour = getIndexLastElement[0];
    let timeEnd = getIndexLastElement[1];
    if (timeEnd[0] == timeStartHour[0]) {
      end = copyData.find(item => item.name == Number(timeStartHour[0]));
      end.minutes = timeEnd[1] - timeStartHour[1];
    } else {
      end = copyData.find((item, i) => item.name == Number(timeEnd[0]));
      start = copyData.find((item, i) => item.name == Number(timeStartHour[0]));
      start.minutes = 60 - timeStartHour[1];
      end.minutes = timeEnd[1];
      copyData
        .slice(Number(timeStartHour[0]) + 1, Number(timeEnd[0]))
        .forEach(item => (item.minutes = 60));
    } }
  };

  render() {
    return (
        <div>

      <ResponsiveContainer minWidth={"100%"} minHeight={"100%"} aspect={5 / 1}>
        <BarChart
          data={this.state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="minutes" fill="#344dc4" />
        </BarChart>
      </ResponsiveContainer>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};
export default connect(mapStateToProps)(Chart)