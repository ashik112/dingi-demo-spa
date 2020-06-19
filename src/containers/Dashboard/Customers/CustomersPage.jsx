import React, {Component} from 'react';
import axios from '../../../utils/axios';
import {apiRoutes} from '../../../routing/apiRoutes';
import {Card, Col, Row} from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
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
    axios.get(apiRoutes.data).then(res => {
      const { data } = res;
      data.forEach((item) => {
        const { date, customer_work_area, customer_name, order_quantity, district } = item;
        console.log(customer_name, customer_work_area);
        if(workAreas[customer_work_area]) {
          if(!workAreas[customer_work_area][customer_name]) {
            workAreas[customer_work_area][customer_name] = 1;
          }
        } else {
          workAreas[customer_work_area] = {};
          workAreas[customer_work_area][customer_name] = 1;
        }

      });
      this.setState({
        pieData: {
          labels: Object.keys(workAreas),
          datasets: [{
            data: Object.keys(workAreas).map((key) => Object.keys(workAreas[key]).length),
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
                  data={[]}
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

export default CustomersPage;
