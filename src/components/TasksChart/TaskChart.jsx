import React, { Component } from "react";
//chart
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
//redux
import { connect } from "react-redux";
import moment from "moment";
import { isDifferenceTime } from "../../helpers/unixToTime";
//componets
import ButtonGenerate from "../ButtonGenerate/ButtonGenerate";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.renderTable();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.onCharts();
  }

  renderTable = () => {
    const { data } = this.state;
    const date = data;
    for (let i = 0; i < 24; i++) {
      date.push({ name: i, minutes: 0 });
    }
    this.setState({ date: date });
  };

  onCharts = () => {
    const { data } = this.state;
    const { tasks } = this.props;
    let copyData = data;
    tasks.forEach(item => {
      const startTimerHour = moment(item.startTime, "HH:mm ");
      const nextHour = moment(startTimerHour.hours() + 1, "HH:mm ");
      const endTimeHour = moment(item.endTime, "HH:mm:ss");
      const durationsInSecond = isDifferenceTime(nextHour, startTimerHour);
      const durationToTime = moment.duration(durationsInSecond, "seconds");
      const timerDuration = moment.duration(item.spendTime, "seconds");
      const increase = (durationToTime - timerDuration) / 1000;
      if (increase > 0) {
        copyData[startTimerHour.hours()].minutes += moment(
          item.spendTime,
          "HH:mm:ss"
        ).minutes();
      }
      if (increase < 0) {
        if (increase * -1 < 3600) {
          copyData[startTimerHour.hours()].minutes += moment
            .duration(durationToTime, "seconds")
            .minutes();
          copyData[endTimeHour.hours()].minutes += endTimeHour.minutes();
        }
        if (increase * -1 > 3600) {
          copyData[startTimerHour.hours()].minutes += moment
            .duration(durationToTime, "seconds")
            .minutes();
          copyData[startTimerHour.hours() + 1].minutes = 60;
          copyData[endTimeHour.hours()].minutes += moment
            .duration(increase * -1, "seconds")
            .minutes();
        }
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
            <YAxis domain={[0, dataMax => 60]} allowDataOverFlow={true} />
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