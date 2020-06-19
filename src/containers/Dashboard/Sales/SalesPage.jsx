import React, {Component} from 'react';
import axios from '../../../utils/axios';
import {apiRoutes} from '../../../routing/apiRoutes';
import {Card, Col, Row} from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
class SalesPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      barData: {},
      pieData: {},
    }
  }

  componentDidMount() {
    // let labels = [];
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
     const labels = Object.keys(dates).map((key) => key).sort((a,b) => new Date(a) - new Date(b));
     Object.keys(products).forEach((product) => {
       const data = [];
       labels.forEach((date) => {
         if(dates[date][product]) {
           data.push(dates[date][product]);
           products[product] += dates[date][product];
         } else {
           data.push(0);
         }
       });
       barDatasets.push({
         label: product,
         data,
       });
     });
     console.log(products);
     console.log(Object.keys(products));
     console.log(Object.keys(products).map((key) => products[key]));
     this.setState({
       barData: {
         labels,
         datasets: barDatasets,
       },
       pieData: {
         labels: Object.keys(products),
         datasets: [{
           data: Object.keys(products).map((key) => products[key]),
         }],
       }
     })
    });
  }

  render() {
    const { barData, pieData } = this.state;
    return (
      <>
      <Row>
        <Col md={12}>
          <Card border="warning" className="m-2">
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
        <Col>
          <Card border="warning" className="m-2">
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
