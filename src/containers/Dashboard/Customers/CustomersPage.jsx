import React, {Component} from 'react';
import axios from '../../../utils/axios';
import {apiRoutes} from '../../../routing/apiRoutes';
import {Card, Col, Row} from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
import { PieChartFill, BarChartFill } from 'react-bootstrap-icons';
import {getMaterialColor} from '../../../utils/colorGenerator';

class CustomersPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      barData: {},
      pieData: {},
    }
  }

  componentDidMount() {
    let dates = {};
    let districts = {};
    let workAreas = {};
    const barDatasets = [];
    axios.get(apiRoutes.data).then(res => {
      const { data } = res;
      data.forEach((item) => {
        const { date, customer_work_area, customer_name, district } = item;
        if(workAreas[customer_work_area]) {
          if(!workAreas[customer_work_area][customer_name]) {
            workAreas[customer_work_area][customer_name] = 1;
          }
        } else {
          workAreas[customer_work_area] = {};
          workAreas[customer_work_area][customer_name] = 1;
        }

        const isDateValid = moment(item.date).isSame(new Date(), 'month');
        if(isDateValid) {
          if(dates[date]) {
            if(!dates[date][district]) {
              dates[date][district] = {};
              districts[district] = 0;
            } else {
              if(!dates[date][district][customer_name]) {
                dates[date][district][customer_name] = 1;
              }
            }
          } else {
            dates[date] ={};
            dates[date][district] ={};
            districts[district] = 0;
            dates[date][district][customer_name] = 1;
          }
        }
      });
      const barLabels = Object.keys(dates).map((key) => key).sort((a,b) => new Date(a) - new Date(b));
      Object.keys(districts).forEach((district) => {
        const data = [];
        barLabels.forEach((date) => {
          if(dates[date][district]) {
            data.push(Object.keys(dates[date][district]).length);
          } else {
            data.push(0);
          }
        });
        barDatasets.push({
          label: district,
          backgroundColor: getMaterialColor(),
          data,
        });
      });
      this.setState({
        barData: {
          labels: barLabels,
          datasets: barDatasets,
        },
        pieData: {
          labels: Object.keys(workAreas),
          datasets: [{
            data: Object.keys(workAreas).map((key) => Object.keys(workAreas[key]).length),
            backgroundColor: Object.keys(workAreas).map((key) => getMaterialColor()),
          }],
        }
      })
    }).catch((e) => e.handleGlobally(e));;
  }

  render() {
    const { barData, pieData } = this.state;
    return (
      <>
        <Row className="p-0 m-0">
          <Col md={6} sm={12} className="p-0 m-0">
            <Card border="warning" className="m-2">
              <Card.Header><BarChartFill /> District Wise Customer Statistics / Current Month</Card.Header>
              <Card.Body>
                <Bar
                  data={barData}
                  width={100}
                  height={400}
                  options={{ maintainAspectRatio: false }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} sm={12} className="p-0 m-0">
            <Card border="warning" className="m-2">
              <Card.Header><PieChartFill /> Work Area Wise Customer Comparison</Card.Header>
              <Card.Body>
                <Pie
                  data={pieData}
                  width={100}
                  height={400}
                  options={{ maintainAspectRatio: false }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default CustomersPage;
