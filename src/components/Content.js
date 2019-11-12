import React from 'react';

import { Row, Col } from "react-bootstrap";

import Chart from "./Chart";
import Converter from "./Converter";
import {inject} from "mobx-react";

let Content = inject('commonStore')(
    class Content extends React.Component {
        componentDidMount() {
            this.props.commonStore.loadCurrencies();
            this.props.commonStore.loadRatesHistories();
        }

        render() {
            return (
                <React.Fragment>
                    <Row>
                        <Col xs={12} md={8}>
                            <Chart/>
                        </Col>
                        <Col xs={6} md={4}>
                            <Converter/>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }
    }
);

export default Content;