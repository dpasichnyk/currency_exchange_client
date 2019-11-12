import React from 'react';
import { inject, observer } from "mobx-react";

import { Form, Col, Badge } from "react-bootstrap";
import Loading from "./Loading";

let Converter = inject('commonStore')(
    observer(
        class Converter extends React.Component {
            handleAmountChange = (el) => {
                this.props.commonStore.setAmount(el.target.value);
                this.props.commonStore.convert();
            };

            handleConvertFromChange = (el) => {
                this.props.commonStore.setConvertFrom(el.target.value);
                this.props.commonStore.convert();
            };

            handleConvertToChange = (el) => {
                this.props.commonStore.setConvertTo(el.target.value);
                this.props.commonStore.convert();
            };

            render() {
                const { amount, convertFrom, convertTo, currencies, conversionResult, isLoadingCurrencies } = this.props.commonStore;

                if (isLoadingCurrencies) return <Loading/>;

                return (
                    <React.Fragment>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>
                                        <small>Convert from: </small>
                                        <Badge variant="light">{convertFrom}</Badge>
                                    </Form.Label>
                                    <Form.Control as="select" value={convertFrom} onChange={this.handleConvertFromChange}>
                                        {currencies.map(currency => {
                                            return (
                                                <option key={currency + 'from'}>{currency}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>
                                        <small>Convert to: </small>
                                        <Badge variant="light">{convertTo}</Badge>
                                    </Form.Label>
                                    <Form.Control as="select" value={convertTo} onChange={this.handleConvertToChange}>
                                        {currencies.map(currency => {
                                            return (
                                                <option key={currency + 'to'}>{currency}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="number" autoComplete="false" value={amount} onChange={this.handleAmountChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Form>

                        <span>
                            <b>You're getting: </b>
                            {conversionResult}
                        </span>
                    </React.Fragment>
                );
            }
        }
    )
);

export default Converter;