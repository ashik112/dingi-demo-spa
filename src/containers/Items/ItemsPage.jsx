import React, {Component} from 'react';
import axios from '../../utils/axios';
import {apiRoutes} from '../../routing/apiRoutes';
import {Card, Table} from 'react-bootstrap';

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      data: [],
    }
  }

  componentDidMount() {
    axios.get(apiRoutes.data).then((res) => {
      this.setState({
        data: res.data,
      });
    })
  }

  render() {
    const {data} = this.state;
    return (
      <Card className="m-2">
        <>
          <Table
            size="sm"
            bordered
            hover
            responsive
          >
            <thead>
            <tr>
              <th>Date</th>
              <th>District</th>
              <th>Name</th>
              <th>Work Area</th>
              <th>Product</th>
              <th className="text-right">Order Quantity</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.district}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.customer_work_area}</td>
                  <td>{item.product}</td>
                  <td className="text-right">{item.order_quantity}</td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </>
      </Card>
    )
  }
}

export default ItemsPage;
