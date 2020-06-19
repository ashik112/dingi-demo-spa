import React, {Component} from 'react';
import axios from '../../utils/axios';
import {apiRoutes} from '../../routing/apiRoutes';

class ItemsPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      data: {},
    }
  }

  componentDidMount() {
    axios.get(apiRoutes.data).then((res) => {
      console.log(res);
    })
  }

  render() {
    return (
      <div>
        Item List
      </div>
    )
  }
}

export default ItemsPage;
