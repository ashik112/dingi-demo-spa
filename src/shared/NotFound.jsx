import React from 'react';
import {
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';
import img from '../assets/404.png';
import {ArrowLeft} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import historyRoutes from '../routing/historyRoutes';

const NotFound = () => {
  return (
    <Container fluid>
      <Row style={{ blur: '0 !important' }} className="h-100 justify-content-center align-items-center content">
        <Col md={12}>
          <h1 className="text-center mb-5">
            <Image src={img}/>
            <br/>
            <br/>
            <Link className="text-warning" to={historyRoutes.dashboard.sales}>
              <span><ArrowLeft />&nbsp;&nbsp;Go Back</span>
            </Link>
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
