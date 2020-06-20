import React, {Component} from 'react';
import axios from '../../../utils/axios';
import {apiRoutes} from '../../../routing/apiRoutes';
import {Card, Col, Row} from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
import { PieChartFill, BarChartFill } from 'react-bootstrap-icons';
import {getMaterialColor} from '../../../utils/colorGenerator';

class SalesPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      barData: {},
      pieData: {},
    }
  }

  componentDidMount() {
    let dates = {};
    let products = {};
    const barDatasets = [];
    axios.get(apiRoutes.data).then(res => {
      const { data } = res;
      data.forEach((item) => {
        const { date, product, order_quantity } = item;
        const isDateValid = moment(item.date).isSame(new Date(), 'month');
        if(isDateValid) {
          if(dates[date]) {
            if(dates[date][product]) {
              dates[date][product] += order_quantity;
            } else {
              dates[date][product] = order_quantity;
              products[product] = 0;
            }
          } else {
            dates[date] = {};
            dates[date][product] = order_quantity;
            products[product] = 0;
          }
        }
      });
      const barLabels = Object.keys(dates).map((key) => key).sort((a,b) => new Date(a) - new Date(b));
      Object.keys(products).forEach((product) => {
        const data = [];
        barLabels.forEach((date) => {
          if(dates[date][product]) {
            data.push(dates[date][product]);
            products[product] += dates[date][product];
          } else {
            data.push(0);
          }
        });
        barDatasets.push({
          label: product,
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
          labels: Object.keys(products),
          datasets: [{
            data: Object.keys(products).map((key) => products[key]),
            backgroundColor: Object.keys(products).map((key) => getMaterialColor()),
          }],
        }
      })
    }).catch((e) => e.handleGlobally(e));
  }

  render() {
    const { barData, pieData } = this.state;
    const currentMonth = moment().format('MMMM');
    return (
      <>
        <Row className="p-0 m-0">
          <Col md={6} sm={12} className="p-0 m-0">
            <Card border="warning" className="m-2">
              <Card.Header><BarChartFill /> Product Wise Order Quantity Statistics / <b>{currentMonth}</b></Card.Header>
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
          <Col md={6}  sm={12} className="p-0 m-0">
            <Card border="warning" className="m-2">
              <Card.Header><PieChartFill /> Product Wise Order Quantity Comparison / <b>{currentMonth}</b></Card.Header>
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

export default SalesPage;
