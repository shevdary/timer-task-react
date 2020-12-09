import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// componets
import ButtonGenerate from '../GenerateButton/GenerateButton';

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
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.renderTable();
  }

  componentDidUpdate() {
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
    countMinuteChart(copyData, tasks);
  };

  render() {
    return (
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
            <XAxis dataKey="name" />
            <YAxis domain={[0, 60]} allowDataOverFlow={true} />
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

const mapStateToProps = ({ tasks: { tasks } }) => ({
  tasks,
});

export default connect(mapStateToProps)(TaskChart);
