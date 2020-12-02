import React, { Component } from "react";
//redux
import { connect } from "react-redux";
import moment from "moment";
import { isDifferenceTime, unixToTime } from "../../helpers/unixToTime";
//components
import ButtonGenerate from "../ButtonGenerate/ButtonGenerate";
//charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

class Chart extends Component {
  constructor(props) {
    super(props);
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
    this.onCharts();
  }

  onCharts = () => {
    const { data } = this.state;
    const { tasks } = this.props;
    let copyData = data;
    tasks.forEach(item => {
      const startTimerHour = moment(item.startTime, "HH:mm:ss");
      const nextHour = moment(startTimerHour.hours() + 1, "HH:mm:ss");
      const durationsInSecond = isDifferenceTime(nextHour, startTimerHour);
      const durationToTime = moment.duration(durationsInSecond, "seconds");
      const timerDuration = moment.duration(item.spendTime, "second");
      const increase = durationToTime.minutes() - timerDuration.minutes();
      if (increase > 0) {
        copyData[startTimerHour.hours()].minutes += moment(
          item.spendTime,
          "HH:mm:ss"
        ).minutes();
      }
      if (increase < 0) {
        copyData[startTimerHour.hours()].minutes += item.spendTime;
        copyData[startTimerHour.hours() + 1].minutes += -increase;
      }
    });
  };
  render() {
    return (
      <div>
        <ResponsiveContainer minWidth="100%" minHeight="100%" aspect={5 / 2}>
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
        <ButtonGenerate />
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