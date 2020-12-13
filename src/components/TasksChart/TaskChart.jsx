import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// componets
import GenerateButton from '../GenerateButton/GenerateButton';

// recharts
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

// utils
import { countMinuteChart } from '../../utils/unixToTime';

class TaskChart extends Component {
  state = {
    data: [],
    chartKey: 0,
  };

  componentDidMount() {
    this.setAxisChart();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.state;
    const { tasks } = this.props;
    countMinuteChart(data, tasks);
    if (prevProps.tasks !== tasks) {
      this.setState({ chartKey: Math.trunc(Math.random() * 10) });
    }
  }

  setAxisChart = () => {
    const { data } = this.state;
    const hourCol = data;
    for (let i = 0; i < 24; i++) {
      hourCol.push({ hour: i, minutes: 0 });
    }
    this.setState({ data: hourCol });
  };

  render() {
    return (
      <div>
        <div>
          <ResponsiveContainer minWidth="100%" minHeight="100%" aspect={4 / 1}>
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
              <XAxis dataKey="hour" />
              <YAxis domain={[0, (dataMax) => 60]} allowDataOverFlow={true} />
              <Tooltip />
              <Legend />
              <Bar dataKey="minutes" fill="#344dc4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <GenerateButton />
      </div>
    );
  }
}

export default connect((state) => ({ tasks: state.tasks.tasks }))(TaskChart);
