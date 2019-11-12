import React from 'react';
import { Spinner } from "react-bootstrap";

export default function Loading() {
    return (
        <React.Fragment>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </React.Fragment>
    );
}