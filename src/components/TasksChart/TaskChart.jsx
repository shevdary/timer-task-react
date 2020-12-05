import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
import moment from 'moment';
import { CountMinuteChart, isDifferenceInTime } from '../../helpers/unixToTime';
//componets
import ButtonGenerate from '../GenerateButton/GenerateButton';
//chart
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

class TaskChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
    CountMinuteChart(copyData, tasks);
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
              bottom: 5,
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
    tasks: state.tasksReducer.tasks,
  };
};
export default connect(mapStateToProps)(TaskChart)