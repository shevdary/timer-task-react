import React, { Component, PureComponent } from "react";
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

/*const data = [
  {
    name: 0
  }
];*/

export default class MyChart extends Component {
  constructor() {
    super();
    this.state = {
      data: [{}]
    };
    this.renderTable();
  }
  renderTable = () => {
    const { data } = this.state;
    const date = data;
    for (let i = 0; i < 24; i++) {
      date.push({ name: i, min: localStorage.getItem("count") });
    }
    this.setState({ date: date });
  };

  componentDidMount() {
    const history = createBrowserHistory();
    history.push("/tab-chart");
  }

  render() {
    return (
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
    );
  }
}
