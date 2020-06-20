/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Card, FormControl, Table } from 'react-bootstrap';
import axios from '../../utils/axios';
import { apiRoutes } from '../../routing/apiRoutes';

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.inputDistrict = React.createRef();
    this.inputProduct = React.createRef();
    this.state = {
      data: [],
      districts: {},
      products: {},
      selectedProduct: 'All',
      selectedDistrict: 'All',
    };
  }

  componentDidMount() {
    axios.get(apiRoutes.data).then((res) => {
      const { data } = res;
      const districts = {};
      const products = {};
      data.forEach((item) => {
        const { district, product } = item;
        if (!districts[district]) {
          districts[district] = null;
        }
        if (!products[product]) {
          products[product] = null;
        }
      });
      this.setState({
        data: res.data,
        districts,
        products,
      });
    }).catch((e) => e.handleGlobally(e));
  }

  handleChange =() => {
    this.setState({
      selectedProduct: this.inputProduct.current.value,
      selectedDistrict: this.inputDistrict.current.value,
    });
  }

  filter = (values) => {
    const { selectedProduct, selectedDistrict } = this.state;
    return (selectedDistrict === 'All' || values.district.includes(selectedDistrict)) && (selectedProduct === 'All' || values.product.includes(selectedProduct));
  };

  render() {
    const { data, districts, products } = this.state;
    return (
      <Card className="m-2">
        <>
          <Table
            size="sm"
            bordered
            hover
            striped
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>
                  District
                  <FormControl ref={this.inputDistrict} as="select" onChange={this.handleChange}>
                    <option>All</option>
                    {
                      Object.keys(districts).map((key) => (
                        <option key={key}>{key}</option>
                      ))
                    }
                  </FormControl>
                </th>
                <th>Name</th>
                <th>Work Area</th>
                <th>
                  Product
                  <FormControl ref={this.inputProduct} as="select" onChange={this.handleChange}>
                    <option>All</option>
                    {
                      Object.keys(products).map((key) => (
                        <option key={key}>{key}</option>
                      ))
                    }
                  </FormControl>
                </th>
                <th className="text-right">Order Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(this.filter).map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.district}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.customer_work_area}</td>
                  <td>{item.product}</td>
                  <td className="text-right">{item.order_quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      </Card>
    );
  }
}

export default ItemsPage;
